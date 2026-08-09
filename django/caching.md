Django 4 and above has Redis as an in-memory database support by default for caching

```
CACHES = {
    'default': {
        'BACKEND': 'django.core.cache.backends.redis.RedisCache',
        'LOCATION': 'redis://<user>:<password>@<public endpoint>',
    }
}
```

### Using `@cache_page` with a Function-Based View

First, configure your cache backend:

```python
# settings.py

CACHES = {
    "default": {
        "BACKEND": "django.core.cache.backends.locmem.LocMemCache",
        "LOCATION": "blog-cache",
    }
}
```

Then use Django's `cache_page` decorator:

```python
from django.views.decorators.cache import cache_page
from django.shortcuts import render
from .models import Blog


@cache_page(60 * 5)  # Cache for 5 minutes
def latest_blogs(request):
    blogs = Blog.objects.order_by("-created_at")[:10]

    return render(
        request,
        "blog/latest.html",
        {"blogs": blogs}
    )
```


The first request:

```text
Request
   ↓
latest_blogs()
   ↓
Database query
   ↓
Render template
   ↓
Response cached
```

Subsequent requests within 5 minutes:

```text
Request
   ↓
Cache hit
   ↓
Cached response
```

## For CBV

```
from django.utils.decorators import method_decorator 
from django.views.decorators.cache import cache_page 
from django.views.generic import ListView from .models import Blog 

@method_decorator(cache_page(60 * 5), name="dispatch") 
class LatestBlogsView(ListView): 
    model = Blog 
    template_name = "blog/latest.html" 
    context_object_name = "blogs" 

    def get_queryset(self): 
        return Blog.objects.order_by("-created_at")[:10]
```        