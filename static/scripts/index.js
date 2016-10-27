'use strict';

/* global Power3 */

//---------//
// Imports //
//---------//


const io = require('socket.io-client')
  , socket = io()
  , TweenLite = require('TweenLite')
  , moment = require('moment')
  , $ = require('jquery')
  ;


//------//
// Init //
//------//

// dem side effects
require('gsapCssPlugin');
require('buddy-system')($);

const colors = [
    "#7EFF9D"
    , "#333"
    , "#A6C2FF"
    , "#6C4F8B"
    , "#FFFBAB"
    , "#B24343"
  ]
  , duration = 0.4
  , myEase = Power3.easeOut
  , readyTimeout = 3000
  , initialReadyTimeout = 6000
  , newTrackTimeout = 200
  ;

let ready = false;


//------//
// Main //
//------//

$(() => {
  $('p.description').buddySystem();

  socket.on('twitter-update', function(theTweets) {
    if (!ready) return;

    checkInitialThenDisplay(theTweets);
  });
  socket.on('track-change', changeTrack);

  if ($('#curtrack').data('curtrack')) {
    setTimeout(
      () => { ready = true; }
      , initialReadyTimeout
    );
  }
  $('#track').click(track);
});


//-------------//
// Helper Fxns //
//-------------//

function changeTrack(newTrack) {
  var oldTextToTrack = $('#text-to-track').val();
  $('#text-to-track').val(newTrack);
  $('#track').prop('disabled', true);
  TweenLite.to($('#tweets'), duration, {
    ease: myEase
    , css: {
      opacity: 0
    }
    , onComplete() {
      setTimeout(
        () => {
          const initialExplanation = (oldTextToTrack === newTrack)
            ? '<p class="initial explanation">Now tracking ' + $('#text-to-track').val() + '</p>'
            : '<p class="initial explanation">Someone decided everyone should now track ' + $('#text-to-track').val() + '</p>';

          $('#tweets').html(initialExplanation);

          TweenLite.to(
            $('#tweets')
            , duration
            , {
              ease: myEase
              , css: { opacity: 1 }
              , onComplete() {
                setTimeout(
                  () => {
                    ready = true;
                    $('#track').prop('disabled', false);
                  }
                  , readyTimeout
                );
              }
            }
          );
        }
        , newTrackTimeout
      );
    }
  });
}

function track() {
  if ($('#track:disabled').length) return;

  ready = false;
  $('#track').prop('disabled', true);
  var stringToTrack = $('#text-to-track').val();
  $.ajax({
    url: "/track"
    , type: "POST"
    , data: { track: stringToTrack }
  });

  return false;
}

function checkInitialThenDisplay(tweets) {
  if (!$('p.initial.explanation').length) {
    displayTweets(tweets);
    return;
  }

  TweenLite.fromTo(
    $('p.initial.explanation')
    , duration
    , { opacity: 1 }
    , {
      ease: myEase
      , css: { opacity: 0 }
      , onComplete() {
        $('p.initial.explanation').remove();
        displayTweets(tweets);
      }
    }
  );
}

function displayTweets(tweets) {
  var tweetHtml = "";
  tweets.forEach(function(e) {
    const randomColor = colors[Math.floor(Math.random() * 6)];
    tweetHtml += "<div class='initial tweet' style='border-top: 3px solid " + randomColor + "; "
      + "border-bottom: 3px solid " + randomColor + ";'><h3>" + e.username + "</h3><p>" + e.text + "</p><div class='timestamp'>Curated " + moment(e.created).format('lll') + "</div></div>";
  });

  const oldContent = $('#tweets').html()
    , curHeight = parseInt($('#tweets').css('height'), 10);

  $('#tweets').prepend(tweetHtml);

  const newHeight = parseInt($('#tweets').css('height'), 10)
    , diffHeight = newHeight - curHeight;

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
          $('.tweet p').buddySystem();
        }
      });
    }
  });
}
