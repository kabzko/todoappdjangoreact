from django.shortcuts import render

def index(request):
    return render(request, 'index.html')

def edit(request, id):
    return render(request, 'index.html')

def delete(request, id):
    return render(request, 'index.html')