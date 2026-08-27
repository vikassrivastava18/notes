## Types of indexes in Pinecone
- Pod-based: Choose hardware to create the index (pods)
- Serverless: No resource management, scale automatically. Run on cloud and vectors are stored in blob

### Create a serverless index

```
from pinecone import Pinecone, ServerlessSpec
pc = Pinecone(api_key="API_KEY")

pc.create_index(
    name = 'datacamp-index',
    dimension=1536,
    spec=ServerlessSpec(
        cloud='aws',
        region='us-east-1'
    )
)

# List indexes
pc.list_indexes()
```

### Managing Indexes
>index = pc.Index('datacamp-index')
>index.describe_index_stats()
>pc.list_indexes()
>pc.delete_index('datacamp-index')

### Check dimensionality
> vectors = [
> {id: 0, "values": [0.0255..., 0.092221..]},    
>]

> all([len(vector['values']) == 1536 for vector in vectors])

### Upserting vectors
>index.upsert(vectors=vectors)
>index.describe_index_stats()

### Inserting vectors with metadata

```
vectors = [
    {
        "id": "0",
        "values": [0.0255..., 0.092221..],
        "metadata": {"genre": "productivity", "year": 2020}
    },
]

Same method - index.upsert(vectors=vectors)
```

## Accessing vectors

### Fetching
<p> Retreive vectors based on their IDs</p>

```
index.fetch(
    ids=['0', '1']
)
``` 

### Querying
<p> Retreive similar vector to an input vector</p>

```
index.query(
    vector=[-0.252224324324, ....],
    top_k=3,
    include_values=True # default is False
)
```

## Meatadata filtering
<p>Metadata can be strings, numbers, Booleans and lists of strings.</p>

```
index.query(
    vector=[....],
    filter={
        "genre": {"$eq": "documentary"},
        "year": {"$gt": 2019}
    },
    top_k=1,
    include_metadatas=True
)
```

## Update a vector

```
# Initialize the Pinecone client with your API key
pc = Pinecone(api_key="...")

index = pc.Index('datacamp-index')

# Update the values of vector ID 7
index.update(
    id='7',
    values=vector,
    set_metadata={"genre": "thriller"}
)

# Fetch vector ID 7
fetched_vector = index.fetch(ids=['7'])
print(fetched_vector)
```

## Delete a vector

```
# Initialize the Pinecone client using your API key
pc = Pinecone(api_key="...")

index = pc.Index('datacamp-index')

# Delete vectors
index.delete(
    ids=["3", "4"]
)

# Retrieve metrics of the connected Pinecone index
print(index.describe_index_stats())
```

## Batching
<p>Following solve the rate and size limit issue but could be very slow!

```
def chunks(iterable, batch_size=100):
    it = iter(iterable)
    chunk = tuple(itertools.islice(it, batch_size))

    while chunk:
        yield chunk
        chunk = tuple(itertools.islice(it, batch_size))

pc = Pinecone(api_key="key")
index = pc.Index("datacamp-index")

for chunk in chunks(vectors):
    index.upsert(vectors=chunk)    
```

## Parallel batching

```
pc = Pinecone(api_key="key", pool_threads=30)

with pc.Index("datacamp-index", pool_threads=30) as index:
    async_results = [index.upsert(vectors=chunk, async_req=True) for chunk in chunks(vectors, batch_size=100)]

    [async_result.get() for async_result in async_results]

```

## Namespace (Multitenancy)

```
# Initialize the Pinecone client with your API key
pc = Pinecone(api_key="key")

index = pc.Index('datacamp-index')

# Insert a vector in namespace1 
index.upsert(
    vector=vector,
    namespace="namespace1")

# Query namespace1 with the vector provided
query_result = index.query(
    vector=vector, 
    namespace="namespace1",
    top_k=3)
print(query_result)
```

## Semantic search

```
from openai import OpenAI
from pinecone import Pinecone, ServerlessSpec

client = OpenAI(pai_key="")
pc = Pinecone(api_key="")

pc.create_index(
    name="semantic-search-datacamp",
    dimension=1536,
    spec=ServerlessSpec(cloud="aws", region="us-east-1")
)
index = pc.Index("semantic-search-index")

```
### Ingesting documents to Pinecone index

```
import pandas as pd
import numpy as np
from uuid import uuid4

df = pd.read_csv("squad_dataset.csv")

batch_limit = 100

for batch in np.array_split(df, len(df)/batch_limit):
    metadatas = [{"text_id": row["id"], "text": row["text"], "title": row["title"]} for _, row in batch.iterrows()]
    texts = batch["text"].tolist()
    ids = [str(uuid4()) for _ in range(len(texts))]

    response = client.embeddings.create(input=texts, model="text-embedding-3-small")
    embeds = [np.array(x.embedding) for x in response.data]

    index.upsert(vectors=zip(ids, embeds, metadatas), namespace="squad_dataset")

index.describe_index_stats()
```

###  Querying with Pinecone

```
query = "To whom did the Virgin Mary allegedly appear in 1858 in Lourdes France"

query_response = client.embeddings.create(
    input=query,
    model="text-embedding-3-small"
)
query_emb = query_response.data[0].embedding

retreived_docs = index.query(vector=query_emb,
                            top_k=3,
                            namesapce=namespace,
                            include_metadata=True)

## Print tihe similarity score and metadatas
for result in retreived_docs["matches"]:
    print(f"{round(result["score"], 2)}: {result["metadata"]["text"]}")
```