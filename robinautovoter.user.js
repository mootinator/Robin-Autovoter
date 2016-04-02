// ==UserScript==
// @name         Robin Autovoter
// @namespace    http://jerl.im
// @version      3.1
// @description  Autovotes via text on /r/robin
// @author       /u/mootinator
// @match        https://www.reddit.com/robin*
// @grant        none
// ==/UserScript==
/* jshint -W097 */
'use strict';


function sendMessage(message){
    $("#robinSendMessage > input[type='text']").val(message);
    $("#robinSendMessage > input[type='submit']").click();
}

function updateStatus() {
    $('#doIStayOrDoIGrowNow').text('Autovoting ' + robinCommand);
}

var robinCommand = "grow";

$(function() {
    $('body').prepend('<div id="doIStayOrDoIGrowNow">Autovoting ' + robinCommand + '</div><button id="stay">Stay</button><button id="grow">Grow</button></div>');
    $('#grow').click(function() { robinCommand = "grow"; updateStatus(); });
    $('#stay').click(function() { robinCommand = "stay"; updateStatus(); });
});

setTimeout(function(){
    var participants = $(".robin-room-participant").length;
    var partiText = "";
    if (participants == 200) partiText = 200 + " " + $(".robin-user-list-overflow-indicator").text();
    else partiText = participants;
    
    sendMessage("/vote " + robinCommand);
    if(Math.random() < 0.2) sendMessage("[Robin Autovoter 3.0] Autovoted " + robinCommand + "!");
    setTimeout(function(){
        window.location.reload();
    }, 300000);
}, 5000);
