$(document).ready(function() {

    // jQuery nivo slider
    $('#screenshoots .nivoSlider').nivoSlider({
        controlNav: false,
        pauseTime: 7000
    });

    // Top main menu scrollspy
    $('#top ul.nav').scrollspy({
        offset: 0
    });

    // jQuery smooth scrolling
    $('#top ul.nav li a').bind('click', function(event) {
        var $anchor = $(this);
        $('html, body').stop().animate({
            scrollTop: parseInt($($anchor.attr('href')).offset().top) - 100
        }, 2000, 'easeInOutExpo');
        event.preventDefault();
    });

    // Create a secondary menu for the responsive navigation
    $("<select />").addClass('pull-right responsive').appendTo("#top .container .row-fluid");
    $("<option />", {
        "selected": "selected",
        "value": "#",
        "text": "Merci de choisir une option..."
    }).appendTo("#top .container .row-fluid select");

    // Dropdown menu list value
    $("#top ul.nav li a").each(function() {
        var el = $(this);
        $("<option />", {
            "value": el.attr("href"),
            "text": el.text()
        }).appendTo("#top .container .row-fluid select");
    });

    // Make the drop-down work
    $("#top .container .row-fluid select").change(function() {
        window.location = $(this).find("option:selected").val();
    });

    /* Contact us process */
    $("#contact-form").submit(function() {
        var submitData = $('#contact-form').serialize();
        $("#contact-form input[name='name']").attr('disabled', 'disabled');
        $("#contact-form input[name='email']").attr('disabled', 'disabled');
        $("#contact-form input[name='subject']").attr('disabled', 'disabled');
        $("#contact-form textarea[name='message']").attr('disabled', 'disabled');
        $("#contact-form input[name='submit']").attr('disabled', 'disabled');
        $("#contact-form .data-status").show().html('<div class="alert alert-info"><strong>Chargement...</strong></div>');
        $.ajax({ // Send an offer process with AJAX
            type: "POST",
            url: "contact.php",
            data: submitData + "&action=add",
            dataType: "html",
            success: function(msg) {
                if (parseInt(msg) != 0) {
                    var msg = msg.split("|");
                    if (msg[0] == "success") {
                        $("#contact-form input[name='name']").val('').removeAttr('disabled');
                        $("#contact-form input[name='email']").val('').removeAttr('disabled');
                        $("#contact-form input[name='subject']").val('').removeAttr('disabled');
                        $("#contact-form textarea[name='message']").val('').removeAttr('disabled');
                        $("#contact-form input[name='submit']").removeAttr('disabled');
                        $("#contact-form .data-status").html(msg[1]).fadeIn();
                    } else {
                        $("#contact-form input[name='name']").removeAttr('disabled');
                        $("#contact-form input[name='email']").removeAttr('disabled');
                        $("#contact-form input[name='subject']").removeAttr('disabled');
                        $("#contact-form textarea[name='message']").removeAttr('disabled');
                        $("#contact-form input[name='submit']").removeAttr('disabled');
                        $("#contact-form .data-status").html(msg[1]).fadeIn();
                    }
                }
            }
        });
        return false;
    });
    /* End contact us process */


    // jQuery placeholder for IE
    $("input, textarea").placeholder();

});