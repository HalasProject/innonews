<?php

namespace App\Http\Controllers;

use Carbon\Carbon;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Http;

class ArticleController extends Controller
{
    public function getArticles(Request $request)
    {
        $params = [
            'search' => $request->get('search', ''),
            'from_date' => $request->get('from_date', ''),
            'to_date' => $request->get('to_date', ''),
            'category' => $request->get('category', ''),
        ];

        $sources = $request->get('source');

        $articles = collect([]);
        if (filter_var($sources['nyt'], FILTER_VALIDATE_BOOLEAN)) {
            $articles = $this->theNewYorkApi($params);
        }

        if (filter_var($sources['newsapi'], FILTER_VALIDATE_BOOLEAN)) {
            $articles = $articles->merge($this->newsApi($params));
        }

        if (filter_var($sources['guardian'], FILTER_VALIDATE_BOOLEAN)) {
            $articles = $articles->merge($this->theGuardianApi($params));
        }


        $allArticles = $articles
            ->shuffle();

        return new JsonResponse($allArticles);
    }

    public function newsApi($params)
    {
        $options =  [
            'q' =>  $params['search'],
            'apiKey' => env('API_KEY_NEWSAPI'),
            'language' => 'en'
        ];

        if ($params['from_date']) $options['from'] = str_replace('/', '-', $params['from_date']);
        if ($params['to_date']) $options['to'] = str_replace('/', '-', $params['to_date']);
        if ($params['category']) $options['category'] = $params['category'];

        $link = 'https://newsapi.org/v2/' . ($params['category'] || is_null($options['q']) ? 'top-headlines' : 'everything');
        try {
            $response = Http::get($link, $options);
            $articles = collect($response->json()['articles']);


            $articles = $articles->map(function ($article) {
                return collect([
                    "title" => $article["title"],
                    "image" => $article["urlToImage"],
                    "source" => "newsapi",
                    "web_url" =>  $article["url"],
                    "pub_date" => Carbon::parse($article["publishedAt"])->diffForHumans(),
                    "word_count" => 'N/A',
                    "time_to_read" => 'N/A'
                ]);
            });
            return collect($articles);
        } catch (\Exception $e) {
            return collect([]);
        }
    }

    public function theGuardianApi($params)
    {
        $options =  [
            'q' =>  '',
            'api-key' => env('API_KEY_GUARDIAN'),
            'show-fields' => 'headline,thumbnail,short-url,wordcount,publication'
        ];
        if ($params['from_date']) $options['from-date'] =  str_replace("/", '-', $params['from_date']);
        if ($params['to_date']) $options['to-date'] = str_replace("/", '-', $params['to_date']);
        if ($params['category']) {
            $CategoryToSection = [
                "business" => "business|education|money",
                "entertainment" => "extra|fashion|film|music|games|help|lifeandstyle|media",
                "general" => "world|info|community|culture|news|society|weather",
                "health" => "environment|food|travel",
                "science" => "science|books",
                "sports" => "sport|football",
                "technology" => "technology"
            ];
            $options['section'] = $CategoryToSection[$params['category']];
        }

        try {
            $response = Http::get('https://content.guardianapis.com/search', $options);

            $articles = collect($response->json()['response']['results']);
            $articles = $articles->map(function ($article) {
                return collect([
                    "title" => $article["fields"]["headline"],
                    "image" => $article["fields"]["thumbnail"],
                    "source" => 'theguardian',
                    "web_url" =>  $article["webUrl"],
                    "pub_date" => Carbon::parse($article["webPublicationDate"])->diffForHumans(),
                    "word_count" => $article["fields"]["wordcount"],
                    "time_to_read" => $this->timeToReadWord($article["fields"]["wordcount"])
                ]);
            });
            return collect($articles);
        } catch (\Exception $e) {
            return collect([]);
        }
    }


    /**
     * theNewYorkApi
     * @param  mixed $params
     * @return void
     */
    public function theNewYorkApi($params)
    {
        $options =  [
            'q' =>  $params['search'],
            'api-key' => env('API_KEY_NYT')
        ];
        if ($params['from_date']) $options['begin_date'] =  str_replace(['-', '/'], '', $params['from_date']);
        if ($params['to_date'])  $options['end_date'] = str_replace(['-', '/'], '', $params['to_date']);
        if ($params['category']) {
            $CategoryToSection = [
                "business" => '"Business", "Education" , "money"',
                "entertainment" => '"Movies" , "fashion" , "film", "music", "games", "help", "lifeandstyle", "media"',
                "general" => '"World" , "info" , "community" , "culture" , "news" , "society" , "weather"',
                "health" => '"Health", "food", "travel"',
                "science" => '"Science", "books"',
                "sports" => '"Sports"',
                "technology" => '"Technology"'
            ];
            $options['fq'] = "news_desk:(" . $CategoryToSection[$params['category']] . ")";
        }


        try {
            $response = Http::get('https://api.nytimes.com/svc/search/v2/articlesearch.json', $options);
            $articles = collect($response->json()['response']['docs']);
            $articles = $articles->map(function ($article) {
                return collect([
                    "title" => $article["headline"]["main"],
                    "image" => $article["multimedia"] ? "https://www.nytimes.com/" . $article["multimedia"][0]["url"] : null,
                    "source" => 'nyc',
                    "web_url" =>  $article["web_url"],
                    "pub_date" => Carbon::parse($article["pub_date"])->diffForHumans(),
                    "word_count" => $article["word_count"],
                    "time_to_read" => $this->timeToReadWord($article["word_count"]),
                    "test" => $article["news_desk"]

                ]);
            });

            return collect($articles);
        } catch (\Exception $e) {
            return collect([]);
        }
    }

    function timeToReadWord(int $wordCount)
    {
        // Average reading speed in words per minute
        $readingSpeed = 200;

        // Reading time in minutes
        $readingTime = $wordCount / $readingSpeed;

        // Format reading time in minutes and seconds
        $formattedReadingTime = gmdate("i:s", $readingTime * 60);

        return $formattedReadingTime;
    }
}
