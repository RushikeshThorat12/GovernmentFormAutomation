# Colab Notebook: Fine-tune Llama-3 on a Custom Dataset
# ------------------------------------------------------

# 1. Install dependencies
!pip install -q transformers peft datasets accelerate bitsandbytes safetensors

# 2. Set up Hugging Face authentication (optional, for pushing to hub)
from getpass import getpass

HF_TOKEN = getpass("Enter your Hugging Face token: ")
!huggingface-cli login --token $HF_TOKEN

# 3. Mount Google Drive (optional, if dataset is stored there)
from google.colab import drive

drive.mount('/content/drive')  # grant access

# 4. Load and preprocess your custom dataset
from datasets import load_dataset

# Example: custom JSON lines dataset in Drive
dataset = load_dataset(
    'json',
    data_files={'train': '/content/drive/MyDrive/custom/train.jsonl',
                'validation': '/content/drive/MyDrive/custom/valid.jsonl'}
)

# Inspect keys
print(dataset)

# 5. Define preprocess function
def preprocess(example):
    # Adjust according to dataset structure: assume each example has 'prompt' and 'completion'
    text = example['prompt'] + example.get('completion', '')
    return {'text': text}

# Apply preprocessing
dataset = dataset.map(preprocess, remove_columns=dataset['train'].column_names)

# 6. Load the tokenizer and model
from transformers import AutoTokenizer, AutoModelForCausalLM
import torch

MODEL_NAME = "meta-llama/Llama-3-7b-hf"  # or path to your base model

# Load 4-bit quantized model with bitsandbytes
tokenizer = AutoTokenizer.from_pretrained(MODEL_NAME, use_fast=True)
model = AutoModelForCausalLM.from_pretrained(
    MODEL_NAME,
    load_in_4bit=True,
    device_map='auto',
    quantization_config=dict(
        load_in_4bit=True,
        bnb_4bit_compute_dtype=torch.bfloat16,
        bnb_4bit_use_double_quant=True,
        bnb_4bit_quant_type="nf4"
    )
)

# 7. Set up PEFT for parameter-efficient fine-tuning
from peft import LoraConfig, get_peft_model

lora_config = LoraConfig(
    r=16,
    lora_alpha=32,
    target_modules=["q_proj", "k_proj", "v_proj", "o_proj"],
    lora_dropout=0.05,
    bias="none"
)
model = get_peft_model(model, lora_config)

# 8. Tokenization helper
def tokenize_fn(batch):
    outputs = tokenizer(batch['text'], truncation=True, max_length=2048)
    outputs['labels'] = outputs['input_ids'].copy()
    return outputs

tokenized_ds = dataset.map(
    tokenize_fn,
    batched=True,
    remove_columns=['text']
)

# 9. Define training arguments
from transformers import Trainer, TrainingArguments

training_args = TrainingArguments(
    output_dir="./llama3-finetuned",
    per_device_train_batch_size=1,
    per_device_eval_batch_size=1,
    gradient_accumulation_steps=8,
    num_train_epochs=3,
    learning_rate=2e-4,
    fp16=True,
    logging_steps=10,
    evaluation_strategy="steps",
    eval_steps=200,
    save_strategy="steps",
    save_steps=200,
    save_total_limit=3,
    push_to_hub=True,
    hub_model_id="YOUR_HF_USERNAME/llama3-custom",
    hub_strategy="every_save"
)

# 10. Initialize Trainer
trainer = Trainer(
    model=model,
    train_dataset=tokenized_ds['train'],
    eval_dataset=tokenized_ds['validation'],
    args=training_args,
    tokenizer=tokenizer
)

# 11. Start fine-tuning
trainer.train()

# 12. (Optional) Save final model locally and to hub
model.save_pretrained("./llama3-finetuned-final")
tokenizer.save_pretrained("./llama3-finetuned-final")
trainer.push_to_hub()
```

**Usage Instructions:**
1. Replace `MODEL_NAME` with the exact Llama-3 HF repo ID you have access to.
2. Place your custom `train.jsonl` and `valid.jsonl` files in your Drive, or adjust paths.
3. Ensure your JSONL files have `prompt` and `completion` fields (or adapt preprocessing).
4. Run each cell sequentially in Colab.  
5. Monitor training logs, and your fine-tuned model will be pushed to Hugging Face Hub under `YOUR_HF_USERNAME/llama3-custom`. #
