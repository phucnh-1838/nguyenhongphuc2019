import wikipedia
from wikipedia import PageError


def wiki_how(keyword, lang):
    try:
        wikipedia.set_lang(lang)
        summary = wikipedia.summary(keyword)
        keyword_recommend = wikipedia.search(keyword)
        return summary, keyword_recommend
    except PageError:
        return 'Opp we can not find any information for you', ['']
