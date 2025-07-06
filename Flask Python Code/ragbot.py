import os
import faiss
import tiktoken
from flask import Blueprint, request, jsonify
from langchain_community.document_loaders import PyMuPDFLoader
from langchain_text_splitters import RecursiveCharacterTextSplitter
from langchain_ollama import OllamaEmbeddings, ChatOllama
from langchain_community.vectorstores import FAISS
from langchain_community.docstore.in_memory import InMemoryDocstore
from langchain.prompts import ChatPromptTemplate
from langchain_core.output_parsers import StrOutputParser

chat_api_blueprint = Blueprint('chat_api', __name__)

# Build RAG chain once
def build_rag_chain():
    pdf_loader = PyMuPDFLoader(os.path.join(os.path.dirname(__file__), 'static/jesc.pdf'))
    docs = pdf_loader.load()
    splitter = RecursiveCharacterTextSplitter(chunk_size=1000, chunk_overlap=100)
    chunks = splitter.split_documents(docs)
    embeddings = OllamaEmbeddings(model='nomic-embed-text', base_url="http://localhost:11434")
    vec = embeddings.embed_query('test')
    index = faiss.IndexFlatL2(len(vec))
    store = FAISS(embedding_function=embeddings, index=index,
                  docstore=InMemoryDocstore(), index_to_docstore_id={})
    store.add_documents(chunks)
    retriever = store.as_retriever(search_type='mmr', search_kwargs={'k':3,'fetch_k':100,'lambda_mult':1})
    prompt = ChatPromptTemplate.from_template(
        "You are an assistant. Question: {question}\nContext: {context}\nAnswer:"
    )
    model = ChatOllama(model='llama3.2:1b', base_url="http://localhost:11434")
    chain = (
        { 'context': retriever.__or__(lambda docs: '\n\n'.join(d.page_content for d in docs)),
          'question': lambda q: q }
        | prompt
        | model
        | StrOutputParser()
    )
    return chain

rag_chain = build_rag_chain()

@chat_api_blueprint.route('/ask', methods=['POST'])
def api_ask():
    data = request.get_json() or {}
    question = data.get('question')
    if not question:
        return jsonify({'error':'No question provided'}),400
    try:
        answer = rag_chain.invoke(question)
        return jsonify({'answer': answer})
    except Exception as e:
        return jsonify({'error': str(e)}),
