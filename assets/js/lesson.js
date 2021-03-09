// Make all tables striped by default.
$("table").addClass("table table-striped");


// Handle foldable challenges and solutions (on click and at start).
$(".solution").click(function(event) {
    var trigger = $(event.target).has(".fold-unfold").length > 0
               || $(event.target).filter(".fold-unfold").length > 0;
    if (trigger) {
        $(">*:not(h2)", this).toggle(400);
        $(">h2>span.fold-unfold", this).toggleClass("glyphicon-collapse-down glyphicon-collapse-up");
        event.stopPropagation();
    }
});
$(".solution").each(function() {
    $(">*:not(h2)", this).toggle();
    var h2 = $("h2:first", this);
    h2.append("<span class='fold-unfold glyphicon glyphicon-collapse-down'></span>");
});


// Handle searches.
// Relies on document having 'meta' element with name 'search-domain'.
function google_search() {
  var query = document.getElementById("google-search").value;
  var domain = $("meta[name=search-domain]").attr("value");
  window.open("https://www.google.com/search?q=" + query + "+site:" + domain);
}

// function to shrink the life cycle bar when scrolling
$(function(){
    $('#life-cycle').data('size','big');
});

// Toggle between GitHub and GitLab content
// article tags with an id github- or gitlab- are alternatively shown/hidden
function check_github_gitlab_selection() {
    if (this.value === 'github' && this.checked) {
        console.log("Enabling GitHub content");
        $("article[id^=github-]").show();
        $("article[id^=gitlab-]").hide();
    }
    else if (this.value === 'gitlab' && this.checked) {
        console.log("Enabling GitLab content");
        $("article[id^=gitlab-]").show();
        $("article[id^=github-]").hide();
    }
}

$(function() {
    // Check if we have URL selection for either GitHub or GitLab
    // The URL parameter takes precedence if set
    let urlParams = new URLSearchParams(window.location.search);
    // Name of url parameter
    let ghgl_attr = "github_gitlab";
    // Widget to select between GitHub and GitLab content
    let ghgl_selector = $('#github-gitlab-selector input[type=radio][name=github-gitlab-selector]');

    if (urlParams.has(ghgl_attr)) {
        // When URL is set we need to get its value to
        // configure the GitHub/GitLab selector widget
        let ghgl = urlParams.get(ghgl_attr);

        // The active class gives the label the "effect" of being selected
        ghgl_selector.parent().removeClass('active');

        // Force ghgl_selector to match the URL provided element
        let selected_radio = ghgl_selector.filter(`[value=${ghgl}]`)
        selected_radio.parent().addClass('active');
        selected_radio.prop('checked', true);
        console.log(`Selected and forced option ${ghgl}`);
    }

    // Trigger content change when the GitHub/GitLab widget is used
    ghgl_selector.change(check_github_gitlab_selection);

    // When the page loads, make sure to hide/show the correct content
    // based on the selection in the GitHub/GitLab widget
    ghgl_selector.trigger("change");

    // To preserve the GitHub/GitLab selection across pages
    // and without relying on cookies (avoiding Cookie Law implications)
    // when a visitor clicks on any <a> the github/gitlab value
    // is added as a URL parameter
    // Note, only consider relative URLs that start with ./ or ../
    let anchors = $("a[href^='./'],a[href^='../']");
    // exclude anchors with dropdown behavior
    anchors = anchors.not("[data-toggle='dropdown']")

    anchors.click(function(e) {
        e.preventDefault();
        let ghgl_value = ghgl_selector.filter(":checked").val();
        let href = this.href;
        if (href.indexOf('?') != -1) {
            // when URL already contains at least 1 parameter
            href = href + `&${ghgl_attr}=${ghgl_value}`;
        } else {
            // when URL contains no parameters
            href = href + `?${ghgl_attr}=${ghgl_value}`;
        }
        window.location.href = href;
    });
});

$(window).scroll(function(){
    if($(document).scrollTop() > 0)
    {
        if($('#life-cycle').data('size') == 'big')
        {
            $('#life-cycle').data('size','small');
            $('#life-cycle').stop().animate({
                padding: '5px'
            },100);
        }
    }
    else
    {
        if($('#life-cycle').data('size') == 'small')
        {
            $('#life-cycle').data('size','big');
            $('#life-cycle').stop().animate({
                padding: '15px'
            },100);
        }
    }
});
