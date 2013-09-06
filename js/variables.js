var AUTOCOMPLETE_TAGS = [];
var TASK_STATUS = {
    'completed': 'icon-check-sign',
    'incomplete': 'icon-check-empty',
}
var TAGS_ARRAY = []
var STAR_IMPORTANCE_STATE = 0
var STAR_IMPORTANCE = {
    0: {star: 'icon-star-empty', text: 'Low Importance'},
    1: {star: 'icon-star-half-empty', text: 'Important'},
    2: {star: 'icon-star', text: 'Very Important'}
}
var COMPLEX_TASK_INPUTS = [
    'text',
    'description',
    'tags',
    'datepicker',
    'clockpick',
]