### Purpose
<p>Embedding takes a chunk of English and turns it into a list of numbers such that chunks that mean similar things land near each other.
</p>

<p>A keyword usually fails to find the relevant chunks due to exact match, RAG finds it more reliably</p>

### What is embedding?
<p>
It is a fixed length dense vector of size say 384 or 1536 carrying the meaning (semantics) of the chunk. A "Dense" embedding is short and every slot carries meaning, in contrast with <i>sparse</i>, vector which has mostly-zero slot per vocabulary word.
</p>

### Cosine similarity
<p>It is generally used to find the best match between the quesry and the embeddings. The similarity search score may vary based on embedding models used. </p>


### Summary
<p> An embedding turns a chunk of text into a fixed length point in a learned space where geometric closeness is semantic closeness, and retreival consists of embedding the query to find the nearest points.
</p>


### Embedding model selection
- Dimensionality:  output vector dimension. This sets our index size, our memory bill and search latency.
- Context length: Maximum number of input tokens the model will actually read before it silently truncates the rest.
- Domain fit: Indicates how well the model was trained for our kind of data, benchmarks like MTEB leaderboard could be referred.
- Cost and latency: Self explanatory.

<b>One should try multiple models and check the recall score for a golden dataset to see which model is a good fit.</b>



### Faster retreival
<p>Rather than comparing million chunks with the query (most accurate) on uses ANN (Approximate nearest neighbor search) which uses indexing to achieve this. 

- HNSW = Heirarchical navigable small world. 
It creates a map connecting nearest vectors to each other. Eachh vector becomes a node and are connected to nearby nodes. HNSW adds multiple layers so that the upper layers can make large jumps and lower layers can perform finer-grained navigation.

```
Highway
   ↓
Main road
   ↓
Street
   ↓
Restaurant
```

- IVF: library shelves = Inverted file index
Imagine your 1 million chunks are divided into 1,000 clusters

```
Cluster 1   → cooking
Cluster 2   → programming
Cluster 3   → finance
Cluster 4   → sports
Cluster 5   → medicine
...
Cluster 1000
```
Technically, IVF typycally creates these groups using k-means clustering. Each group is represented by  centroid.

```
1,000,000 vectors
        ↓
Find closest clusters
        ↓
Search only those clusters
        ↓
Top-k results
```
