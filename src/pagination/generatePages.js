module.exports = function generatePages({ current = 0, maxPages = 1 }) {
    const pages = [];
    function page(index) {
        return {
            start: index,
            isCurrent: current === index
        };
    }

    if (current >= maxPages) {
        return pages;
    }
    if (current < 6) {
        for (let i = 0; i < Math.min(maxPages, 10); ++i) {
            pages.push(page(i));
        }
    } else {
        for (let i = current - 5; i < Math.min(current + 5, maxPages); ++i) {
            pages.push(page(i));
        }
    }

    return pages;
};
