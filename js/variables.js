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
var SHOW_DELETE = 'hide';
//======================== TASK RENDERING =========================
var TASK_ELEMENT =  "<div class='accordion-group {completed_state}' data-id='{collapse_id}'> \
                        <div class='accordion-heading'> \
                            <a class='accordion-toggle' data-toggle='collapse' data-parent='#accordion2' href='#collapse_{collapse_id}'> \
                                {title} \
                                <i id='check_{collapse_id}' data-status='{completed_state}' class='{completed_state_class} checkStyle pull-left'></i> \
                                <i id='item_star_{collapse_id}' data-importance='{importance}' class='{priority} starStyle pull-left'></i> \
                                <div class='sepLine pull-left'></div> \
                                <input class='pull-left hide' type='checkbox' data-id={collapse_id}> \
                                <span class='pull-right'>{due_date}</span> \
                            </a> \
                        </div> \
                        {collapse} \
                    </div>";
var COLLAPSE_ELEMENT = "<div id='collapse_{collapse_id}' class='accordion-body collapse'> \
                            <div class='accordion-inner'> \
                                {description} \
                                {tags} \
                                {subtasks} \
                             </div> \
                        </div>";