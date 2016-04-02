// ==UserScript==
// @name         Robin Autovoter
// @namespace    http://jerl.im
// @version      3.3
// @description  Autovotes via text on /r/robin
// @author       /u/mootinator
// @match        https://www.reddit.com/robin*
// @grant        GM_getValue
// @grant        GM_setValue
// ==/UserScript==
/* jshint -W097 */
'use strict';


function sendMessage(message){
    $("#robinSendMessage > input[type='text']").val(message);
    $("#robinSendMessage > input[type='submit']").click();
}

$(function() {
    var robinCommand = GM_getValue("robinCommand","grow");
    
    $('body').prepend('<div id="doIStayOrDoIGrowNow">Autovoting ' + robinCommand + '</div><button id="stay">Stay</button><button id="grow">Grow</button></div>');
    $('#grow').click(function() { robinCommand = "grow"; updateStatus("Grow"); GM_setValue("robinCommand", "grow"); });
    $('#stay').click(function() { robinCommand = "stay"; updateStatus("Stay"); GM_setValue("robinCommand", "stay"); });
    
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
});

function updateStatus(cmd) {
    $('#doIStayOrDoIGrowNow').text('Autovoting ' + cmd);
}



