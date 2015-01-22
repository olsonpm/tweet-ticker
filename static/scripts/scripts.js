'use strict';
/* --execute=browserify-- */

var io = require('socket.io-client');
var socket = io();
var TweenLite = require('TweenLite');
require('gsapCssPlugin');
var moment = require('moment');
var $ = require('./jqueryPluginsList');

var colors = [{
    bg: "#7EFF9D"
}, {
    bg: "#333"
}, {
    bg: "#A6C2FF"
}, {
    bg: "#6C4F8B"
}, {
    bg: "#FFFBAB"
}, {
    bg: "#B24343"
}];

var duration = 0.4;
var myEase = Power3.easeOut;
var readyTimeout = 1000;
var initialReadyTimeout = 6000;
var newTrackTimeout = 200;
var ready = false;

$(function() {
    // document is ready
    socket.on('twitter-update', function(theTweets) {
        if (ready) {
            checkInitialThenDisplay(theTweets);
        }
    });
    socket.on('track-change', function(newTrack) {
        console.log('track changed: ' + newTrack);
        changeTrack(newTrack);
    });

    var curTrack = $('#curtrack').data('curtrack');
    if (curTrack) {
        setTimeout(function() {
            ready = true;
        }, initialReadyTimeout);
    }
    $('#track').click(track);
});

function changeTrack(newTrack) {
    var oldTextToTrack = $('#text-to-track').val();
    $('#text-to-track').val(newTrack);
    $('#track').prop('disabled', true);
    var curHeight = $('#tweets').css('height');
    TweenLite.to($('#tweets'), duration, {
        ease: myEase
        , css: {
            opacity: 0
        }
        , onComplete: function() {
            setTimeout(function() {
                if (oldTextToTrack === newTrack) {
                    $('#tweets').html('<p class="initial explanation">Now tracking ' + $('#text-to-track').val() + '</p>');
                } else {
                    $('#tweets').html('<p class="initial explanation">Someone decided everyone should now track ' + $('#text-to-track').val() + '</p>');
                }

                TweenLite.to($('#tweets'), duration, {
                    ease: myEase
                    , css: {
                        opacity: 1
                    }
                    , onComplete: function() {
                        setTimeout(function() {
                            ready = true;
                            $('#track').prop('disabled', false);
                        }, readyTimeout);
                    }
                });
            }, newTrackTimeout);
        }
    });
}

function track() {
    if ($('#track:disabled').length) {
        return;
    }
    ready = false;
    $('#track').prop('disabled', true);
    var stringToTrack = $('#text-to-track').val();
    $.ajax({
        url: "/track"
        , type: "POST"
        , data: {
            track: stringToTrack
        }
    });
}

function checkInitialThenDisplay(tweets) {
    if ($('p.initial.explanation').length) {
        TweenLite.fromTo($('p.initial.explanation'), duration, {
            opacity: 1
        }, {
            ease: myEase
            , css: {
                opacity: 0
            }
            , onComplete: function() {
                $('p.initial.explanation').remove();
                displayTweets(tweets);
            }
        });
    } else {
        displayTweets(tweets);
    }
}

function displayTweets(tweets) {
    var tweetHtml = "";
    tweets.forEach(function(e) {
        var randomColor = colors[Math.floor(Math.random() * 6)];
        tweetHtml += "<div class='initial tweet' style='border-top: 3px solid " + randomColor.bg + "; "
            + "border-bottom: 3px solid " + randomColor.bg + ";'><h3>" + e.username + "</h3><p>" + e.text + "</p><div class='timestamp'>Curated " + moment(e.created).format('lll') + "</div></div>";
    });
    var oldContent = $('#tweets').html();
    var curHeight = parseInt($('#tweets').css('height'), 10);
    $('#tweets').prepend(tweetHtml);
    var newHeight = parseInt($('#tweets').css('height'), 10);
    var diffHeight = newHeight - curHeight;
    // reset content
    $('#tweets').html(oldContent);

    // now animate
    TweenLite.to($('.tweet'), ((3.5 * tweets.length) / (4 + tweets.length)), {
        ease: myEase
        , css: {
            top: diffHeight
        }
        , onComplete: function() {
            $('#tweets').prepend(tweetHtml);
            $('.tweet').css('top', '');
            TweenLite.fromTo($('.tweet.initial'), duration, {
                opacity: 0
            }, {
                ease: myEase
                , css: {
                    opacity: 1
                }
                , onComplete: function() {
                    $('.tweet').removeClass('initial');
                    $('.tweet').css('opacity', '');
                }
            });
        }
    });
}
