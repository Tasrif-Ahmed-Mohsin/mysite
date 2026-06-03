import urllib.request
import json

url = "https://api.github.com/users/Tasrif-Ahmed-Mohsin/repos"
req = urllib.request.Request(url, headers={'User-Agent': 'Mozilla/5.0'})
try:
    with urllib.request.urlopen(req) as response:
        data = json.loads(response.read().decode())
        repos = []
        for repo in data:
            repos.append({
                "name": repo.get("name"),
                "description": repo.get("description"),
                "language": repo.get("language"),
                "url": repo.get("html_url")
            })
        print(json.dumps(repos, indent=2))
except Exception as e:
    print(f"Error: {e}")
