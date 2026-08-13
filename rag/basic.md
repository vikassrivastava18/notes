## Why need RAG
- Everythin LLM "knows" was encoded into its weights during training and then frozen (training cutoff) - Parametric memory.
- Private data relevant to an organization is not in public domain, hence an LLM cannot access it for accurate queries.
- Citation is possible when we provide local documents (with citation like source URL saved) to an LLM and so result can be trusted.

## What is RAG?
It is Retreival-Augmented Generation, a technique of augmenting a language model's generation with context that is retreived at query time from an external knowledge source, rather than relying on model's parametric memory.

## RAG vs Fine Tuning
Fine-tuning changes weight, so it learns a new skill, style or format like answering in a company's specific support-ticket voice. RAG changes the context, supplies fresh facts before inferce for grounded response.