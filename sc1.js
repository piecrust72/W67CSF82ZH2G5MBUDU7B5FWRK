// ==UserScript==
// @name         Replace Christopher Paragraph (Styled Replacement)
// @namespace    http://tampermonkey.net/
// @version      1.4
// @description  Replace Urban Dictionary definition of Christopher with styled custom text, instantly and dynamically using MutationObserver.
// @author       
// @match        https://www.urbandictionary.com/define.php?term=Christopher
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    const detectionKeyword = "Christopher is a very unique dude";

    const replacementHTML = `
Christopher is the guy you notice when he walks in — towering over most, undeniably <a href="https://www.urbandictionary.com/define.php?term=handsome" class="word" target="_blank">handsome</a>, and somehow pulling it off even while battling weight fluctuations and premature hair loss like a true warrior. He’s got that rare mix of rugged charm and <a href="https://www.urbandictionary.com/define.php?term=chaotic" class="word" target="_blank">chaotic</a> spontaneity, which often makes life exciting… and occasionally <a href="https://www.urbandictionary.com/define.php?term=catastrophic" class="word" target="_blank">catastrophic</a>.<br><br>

Christopher is impulsive — a man of the moment. Planning ahead? Not really his style. Whether it’s work or money, he tends to sprint after the train long after it’s left the station. But here’s the twist: just when it seems like he’s buried himself too deep to climb out, he somehow not only resurfaces — he rockets upward. That’s his <a href="https://www.urbandictionary.com/define.php?term=magic" class="word" target="_blank">magic</a>. Hitting rock bottom isn’t failure for him; it’s launch prep.<br><br>

Financial ruin? Temporary.<br>
Work chaos? A phase.<br>
Stress? An old friend.<br>
Reinvention? His <a href="https://www.urbandictionary.com/define.php?term=specialty" class="word" target="_blank">specialty</a>.<br><br>

He’s like a <a href="https://www.urbandictionary.com/define.php?term=phoenix" class="word" target="_blank">phoenix</a> with anxiety and dark humor — always reborn, usually with better shoes.<br><br>

But what truly sets Christopher apart is what’s going on in that head of his. When it comes to tech, computers, online services, marketing, and <a href="https://www.urbandictionary.com/define.php?term=social+systems" class="word" target="_blank">social systems</a>, he’s not just ahead of the curve — he <a href="https://www.urbandictionary.com/define.php?term=is+the+curve" class="word" target="_blank">is the curve</a>. Whether it’s coding complex tools, automating tasks, reading user behavior like a novel, or building entire platforms from scratch, he’s got a gift. He doesn’t just think outside the box — he writes the code that deletes the box.<br><br>

Psychology, persuasion, <a href="https://www.urbandictionary.com/define.php?term=digital+strategy" class="word" target="_blank">digital strategy</a> — these aren’t just interests; they’re part of his mental operating system. His brain was built for this world, and his understanding of how people and machines work together is his golden ticket… not once, not twice, but for the third big comeback of his life.<br><br>

The catch? He just has to finish something.<br>
That’s the missing piece — consistency. Following through like he used to. Sticking with it, instead of letting unfinished <a href="https://www.urbandictionary.com/define.php?term=genius" class="word" target="_blank">genius</a> gather dust in a corner of his desktop (or his brain). That’s where she comes in — the right partner. The one who pushes, steadies, and believes. She doesn’t need to be perfect. She just needs to see him for who he really is and remind him of what he already knows deep down: he’s meant for more. Together, they’ll build not just success, but something <a href="https://www.urbandictionary.com/define.php?term=extraordinary" class="word" target="_blank">extraordinary</a>.<br><br>

Christopher doesn’t care about your past. He’s not here to judge — he’s here to grow with you. Ten-page rap sheet? Welcome. Broken heart? Been there. He sees who you are now and who you’re becoming, and he respects the journey. That said, don’t be surprised if he stereotypes with <a href="https://www.urbandictionary.com/define.php?term=laser+precision" class="word" target="_blank">laser precision</a>. It’s uncanny, hilarious, and a little spooky.<br><br>

He struggles deeply with self-image, especially around weight. He jokes, deflects, uses sarcasm like a shield — but beneath it all is a man constantly questioning his worth. He’s working on it. Slowly. Honestly. He might not be in <a href="https://www.urbandictionary.com/define.php?term=therapy" class="word" target="_blank">therapy</a> (yet), but he knows the mirror lies and self-doubt is the real battle.<br><br>

Sexuality? Mostly straight, but labels don’t hold much power over him. He’s <a href="https://www.urbandictionary.com/define.php?term=open-minded" class="word" target="_blank">open-minded</a>, honest, and yes — a certified <a href="https://www.urbandictionary.com/define.php?term=freak+in+the+sheets" class="word" target="_blank">freak in the sheets</a>. There’s a boldness there, but also a tenderness. No performance, just raw authenticity.<br><br>

Christopher is <a href="https://www.urbandictionary.com/define.php?term=brilliant" class="word" target="_blank">brilliant</a> — sharp-minded, quick-witted, and never dull. He’s the guy who’ll make you laugh until your stomach hurts, even on your worst day. But he’s also a work in progress — and proud of it. Because no matter what life throws his way, he doesn’t just survive… he evolves.<br><br>

So if you meet a Christopher, keep him close. He’s a rare blend of disaster and genius, wrapped in sarcasm, laced with kindness, powered by resilience, and right on the edge of something <a href="https://www.urbandictionary.com/define.php?term=great" class="word" target="_blank">great</a> — again.
`;

    function replaceParagraph() {
        const meaningDivs = document.querySelectorAll('.meaning');
        meaningDivs.forEach(div => {
            if (div.textContent.includes(detectionKeyword)) {
                div.innerHTML = replacementHTML.trim();
            }
        });
    }

    replaceParagraph(); // Run once immediately

    const observer = new MutationObserver(() => {
        replaceParagraph(); // Run again on changes
    });

    observer.observe(document.body, {
        childList: true,
        subtree: true
    });
})();
