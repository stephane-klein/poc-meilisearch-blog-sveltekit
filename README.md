# POC Meilisearch Blog SvelteKit

Context: https://github.com/stephane-klein/backlog/issues/244

```sh
$ docker-compose up -d
$ curl \
  -X POST 'http://localhost:7700/indexes/posts/documents?primaryKey=id' \
  -H 'Content-Type: application/json' \
  --data-binary @posts.json

$ curl -s http://localhost:7700/tasks/0 | jq
{
  "uid": 0,
  "indexUid": "posts",
  "status": "succeeded",
  "type": "documentAdditionOrUpdate",
  "canceledBy": null,
  "details": {
    "receivedDocuments": 6,
    "indexedDocuments": 6
  },
  "error": null,
  "duration": "PT0.044495169S",
  "enqueuedAt": "2023-06-21T04:35:22.215615127Z",
  "startedAt": "2023-06-21T04:35:22.219341735Z",
  "finishedAt": "2023-06-21T04:35:22.263836904Z"
}

$ curl -s -X POST 'http://localhost:7700/indexes/posts/search' \
  -H 'Content-Type: application/json' \
  --data-binary '{ "q": "réseaux sociaux" }' | jq
{
  "hits": [
    {
      "id": 2,
      "title": "John Doe fait le Chemin de Stevenson - Journée d'étape 2",
      "body": "<p>John Doe, accompagné de son yak, a fait le premier pas sur le Chemin de Stevenson le 12 juin 2023. Hier était la première journée de sa randonnée et aujourd'hui, 13 juin, c'était le début de la deuxième.</p>\n\n<p>La journée a été riche en découvertes. John a traversé des forêts, des montagnes et des sentiers escarpés, le long desquels il a pu admirer la nature qui le surplombait. Les paysages côtiers l'ont fait s'arrêter à plusieurs reprises, émerveillé par ce qu'il voyait. Malgré le vent et la pluie, John et le yak poursuivaient leur long chemin. Dans la journée, ils ont parcouru 20km environ, avant de finir par s'arrêter et s'installer pour la nuit.</p> \n\n<p>John a partagé son aventure sur les réseaux sociaux et ravit son audience. Une chose est sûre, demain promet encore plus de grandes découvertes !</p>",
      "tags": [
        "Chemin de Stevenson",
        "Randonnée",
        "John Doe",
        "Yak",
        "Nature",
        "Voyage"
      ],
      "date": "2023-06-13"
    }
  ],
  "query": "réseaux sociaux",
  "processingTimeMs": 0,
  "limit": 20,
  "offset": 0,
  "estimatedTotalHits": 1
}

$ curl -s \
  -X PATCH 'http://localhost:7700/indexes/posts/settings' \
  -H 'Content-Type: application/json' \
  --data-binary '{
    "searchableAttributes": [
        "title",
        "body"
    ],
    "filterableAttributes": [
      "tags"
    ],
    "sortableAttributes": [
      "date"
    ]
  }' | jq


$ curl -s \
  -X POST 'http://localhost:7700/indexes/posts/search' \
  -H 'Content-Type: application/json' \
  --data-binary '{ "filter": "tags=nature" }' | jq
```

Go to http://127.0.0.1:7700/ to play with the search engine.
