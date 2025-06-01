// ==UserScript==
// @name         Replace Christopher Paragraph (Styled Replacement)
// @namespace    http://tampermonkey.net/
// @version      1.5
// @description  Replace Urban Dictionary and SophisticatedSoap definition of Christopher with styled custom text, instantly and dynamically using MutationObserver.
// @author       
// @match        https://www.urbandictionary.com/define.php?term=Christopher
// @match        https://sophisticatedsoap.com/*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    const detectionKeyword = "Christopher is a very unique dude";

    const replacementHTML = `
Christopher is the guy you notice when he walks in — towering over most, <a class="autolink" href="/define.php?term=undeniably%20handsome">undeniably handsome</a>, and somehow pulling it off even while battling <a class="autolink" href="/define.php?term=weight%20fluctuations">weight fluctuations</a> and premature hair loss like a true warrior. He’s got that rare mix of <a class="autolink" href="/define.php?term=rugged%20charm">rugged charm</a> and chaotic spontaneity, which often makes life exciting… and occasionally catastrophic.<br><br>

Christopher is <a class="autolink" href="/define.php?term=impulsive">impulsive</a> — a man of the moment. Planning ahead? Not really his style. Whether it’s work or money, he tends to <a class="autolink" href="/define.php?term=sprint%20after%20the%20train">sprint after the train</a> long after it’s left the station. But here’s the twist: just when it seems like he’s buried himself too deep to climb out, he somehow not only resurfaces — he rockets upward. That’s his magic. Hitting rock bottom isn’t failure for him; it’s <a class="autolink" href="/define.php?term=launch%20prep">launch prep</a>.<br><br>

Financial ruin? It's temporary.<br>
Work chaos? A phase.<br>
Stress? An old friend.<br>
Reinvention? His specialty.<br><br>

He’s like a <a class="autolink" href="/define.php?term=phoenix%20with%20anxiety">phoenix with anxiety</a> and dark humor — always reborn, usually with better shoes.<br><br>

But what truly sets Christopher apart is what’s going on in that head of his. When it comes to tech, computers, online services, marketing, and social systems, he’s not just ahead of the curve — <a class="autolink" href="/define.php?term=he%20is%20the%20curve">he is the curve</a>. Whether it’s coding complex tools, automating tasks, reading user behavior like a novel, or building entire platforms from scratch, he’s got a gift. He doesn’t just think outside the box — he writes the code that deletes the box.<br><br>

Psychology, persuasion, <a class="autolink" href="/define.php?term=digital%20strategy">digital strategy</a> — these aren’t just interests; they’re part of his mental operating system. His brain was built for this world, and his understanding of how people and machines work together is his <a class="autolink" href="/define.php?term=golden%20ticket">golden ticket</a>… not once, not twice, but for the third big comeback of his life.<br><br>

The catch? He just has to finish something.<br>
That’s the missing piece — <a class="autolink" href="/define.php?term=consistency">consistency</a>. Following through like he used to. Sticking with it, instead of letting <a class="autolink" href="/define.php?term=unfinished%20genius">unfinished genius</a> gather dust in a corner of his desktop (or his brain). That’s where she comes in — the right partner. The one who pushes, steadies, and believes. She doesn’t need to be perfect. She just needs to see him for who he really is and remind him of what he already knows deep down: he’s meant for more. Together, they’ll build not just success, but something extraordinary.<br><br>

Christopher doesn’t care about your past. He’s not here to judge — he’s here to grow with you. Ten-page rap sheet? Welcome. Broken heart? Been there. He sees who you are now and who you’re becoming, and he respects the journey. That said, don’t be surprised if he <a class="autolink" href="/define.php?term=stereotypes%20with%20precision">stereotypes with precision</a>. It’s uncanny, hilarious, and a little spooky.<br><br>

He struggles deeply with self-image, especially around weight. He jokes, deflects, uses sarcasm like a shield — but beneath it all is a man constantly questioning his worth. He’s working on it. Slowly. Honestly. He might not be in therapy (yet), but he knows the mirror lies and <a class="autolink" href="/define.php?term=self-doubt">self-doubt</a> is the real battle.<br><br>

Sexuality? Mostly straight, but labels don’t hold much power over him. He’s open-minded, honest, and yes — a <a class="autolink" href="/define.php?term=certified%20freak">certified freak</a> in the sheets. There’s a boldness there, but also a tenderness. No performance, just raw authenticity.<br><br>

Christopher is brilliant — sharp-minded, quick-witted, and never dull. He’s the guy who’ll make you laugh until your stomach hurts, even on your worst day. But he’s also a <a class="autolink" href="/define.php?term=work%20in%20progress">work in progress</a> — and proud of it. Because no matter what life throws his way, he doesn’t just survive… he <a class="autolink" href="/define.php?term=evolves">evolves</a>.<br><br>

So if you meet a Christopher, keep him close. He’s a rare blend of disaster and genius, wrapped in sarcasm, laced with kindness, powered by resilience, and right on the edge of something great — again.
`;

    function replaceParagraph() {
        const meaningDivs = document.querySelectorAll('.meaning');
        meaningDivs.forEach(div => {
            // First replace paragraph if it matches keyword
            if (div.textContent.includes(detectionKeyword)) {
                div.innerHTML = replacementHTML.trim();
            }
            
            // Additional Find & Replace for the name "Michael"
            if (div.innerHTML.includes('Michael')) {
                div.innerHTML = div.innerHTML.replace(/Michael/g, 'Christopher');
            }

            // Additional Find & Replace for the name "Michael"
            if (div.innerHTML.includes('Michael')) {
                div.innerHTML = div.innerHTML.replace(/Michael/g, 'Christopher');
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
