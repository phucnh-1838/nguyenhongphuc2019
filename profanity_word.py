from better_profanity import profanity


def profanity_word(text, lang):
    if lang == 'vi':
        profanity.load_censor_words_from_file('banned_word.text')
        if profanity.contains_profanity(text):
            return profanity.censor(text, '-')
        return text
    profanity.load_censor_words()
    if profanity.contains_profanity(text):
        return profanity.censor(text, '*')
    return text

