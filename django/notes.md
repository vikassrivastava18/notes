# Serializer
```
The client application generally uses the JSON data format to send information to the server. DRF uses JSONParser by default to parse the data from the JSON format to Python native format. Finally the Python native format data would be passed to JSONRenderer to render the data into the JSON format and sent to the client
```
<img src="../assets/sreializer.jpg" width=800>

```
# blog/models.py
class Blog(BaseTimeStampModel):
    title = models.CharField(max_length=200)
    content = models.TextField()
    author = models.ForeignKey(Author, related_name='author_blogs', on_delete=models.PROTECT)

# blog/serializers.py
class BlogSerializer(serializers.ModelSerializer):
    class Meta:
        model = Blog
        fields = '__all__'
```

## F()
It is a powerful tool used to perform database operation at the database level. It allows you to reference the value of a field directly in your query.
```
from django.db import models

class Product(models.Model):
    name = models.CharFiled(max_length=100)
    price = models.DecimalField(max_digits=10, decimal_places=2)

from django.db.models import F
Product.objects.update(price=F('price') * 1.10)
```

## Q()
It is used to write complex database queries with logical operators like OR(|), AND(&), and NOT(~).
```
from django.models import Q

p = Person.objects.filter(Q(name='Alice') | Q(age=30))
```

## prefetch_related
It is a performance optimization method in Django's QuerySet API
```
N+1 Query Issue

books = book.objects.all()

for book in books:
    print([author.name for author in book.authors.all()])

```
Using prefetch_related
```
books = Book.objects.prefetch_related('authors').all()

for book in books:
    print([author.name for author in book.authors.all()])
```


