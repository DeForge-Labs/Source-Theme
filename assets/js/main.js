/* Mobile menu burger toggle */
(function () {
    const navigation = document.querySelector('.gh-navigation');
    const burger = navigation.querySelector('.gh-burger');
    if (!burger) return;

    burger.addEventListener('click', function () {
        if (!navigation.classList.contains('is-open')) {
            navigation.classList.add('is-open');
            document.documentElement.style.overflowY = 'hidden';
        } else {
            navigation.classList.remove('is-open');
            document.documentElement.style.overflowY = null;
        }
    });
})();

/* Add lightbox to gallery images */
(function () {
    lightbox(
        '.kg-image-card > .kg-image[width][height], .kg-gallery-image > img'
    );
})();

/* Responsive video in post content */
(function () {
    const sources = [
        '.gh-content iframe[src*="youtube.com"]',
        '.gh-content iframe[src*="youtube-nocookie.com"]',
        '.gh-content iframe[src*="player.vimeo.com"]',
        '.gh-content iframe[src*="kickstarter.com"][src*="video.html"]',
        '.gh-content object',
        '.gh-content embed',
    ];
    reframe(document.querySelectorAll(sources.join(',')));
})();

/* Turn the main nav into dropdown menu when there are more than 5 menu items */
(function () {
    dropdown();
})();

/* Infinite scroll pagination */
(function () {
    if (!document.body.classList.contains('home-template') && !document.body.classList.contains('post-template')) {
        pagination();
    }
})();

/* Responsive HTML table */
(function () {
    const tables = document.querySelectorAll('.gh-content > table:not(.gist table)');
    
    tables.forEach(function (table) {
        const wrapper = document.createElement('div');
        wrapper.className = 'gh-table';
        table.parentNode.insertBefore(wrapper, table);
        wrapper.appendChild(table);
    });
})();

(function () {
    window.addEventListener('load', () => {
    let ghostPortal = document.getElementById('ghost-portal-root');
    let ghostPortalWrapper = null;
    let portalContentFinder = null;

    // Renamed the function for clarity
    const findAndModifyPortal = () => {
      // Access the iframe's document
      const iframeDoc = ghostPortalWrapper.firstChild.contentDocument;

      // Check if the iframe's body content has loaded yet
      if (!iframeDoc || !iframeDoc.body) {
        return;
      }
      
      const ghostPowered = iframeDoc.body.querySelector('.gh-portal-powered');
      
      // Once we find this element, we know the portal is ready to be modified
      if (ghostPowered != null) {
        // 1. Hide the "Powered by Ghost" link (original functionality)
        ghostPowered.style.display = 'none';

        // 2. Create a new <style> element to hold your CSS (new functionality)
        // const style = iframeDoc.createElement('style');
        // style.innerHTML = `
        //   .gh-portal-btn-primary, .gh-portal-btn-link {
        //     color: #000 !important;
        //   }
        // `;
        // 3. Append the new styles to the iframe's <head>
        // iframeDoc.head.appendChild(style);

        // 4. Stop the interval now that our work is done
        clearInterval(portalContentFinder);
      }
    }

    let portalObserver = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.addedNodes[0]?.nodeName === 'DIV') {
          ghostPortalWrapper = mutation.addedNodes[0];
          // Use the new function name
          portalContentFinder = setInterval(findAndModifyPortal, 50);
        }
      });
    });

    portalObserver.observe(ghostPortal, {
      attributes: false,
      characterData: true,
      childList: true,
      subtree: true,
      attributeOldValue: false,
      characterDataOldValue: true
    })
  });
})();