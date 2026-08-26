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