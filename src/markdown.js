import MarkdownIt from 'markdown-it';
import markdownItHashtag from 'markdown-it-hashtag';

export const markdownIt = new MarkdownIt({
    html: true,
    linkify: true,
    typographer: true
})
.use(markdownItHashtag, {
      hashtagRegExp: '[a-zA-Z-]+',
      preceding:     '^|\\s'
});

markdownIt.renderer.rules.hashtag_open  = function(tokens, idx) {
    var tagName = tokens[idx].content.toLowerCase();
    return '<a href="/search/?q=%23' + tagName + '" class="tag">';
};

markdownIt.renderer.rules.hashtag_text  = function(tokens, idx) {
    return '#' + tokens[idx].content;
};

markdownIt.renderer.rules.hashtag_close = function() {
    return '</a>';
};
