import * as React from 'react';
import NextLink from 'next/link';

export default function Link({ children, href, ...other }) {
    // Anchor links (e.g., #partner-form-section) - scroll to section without opening new tab
    const isAnchor = href?.startsWith('#');
    if (isAnchor) {
        return (
            <a href={href} {...other}>
                {children}
            </a>
        );
    }

    // Pass Any internal link to Next.js Link, for anything else, use <a> tag
    const internal = /^\/(?!\/)/.test(href);
    if (internal) {
        return (
            <NextLink href={href} {...other}>
                {children}
            </NextLink>
        );
    }

    // External links - open in new tab for better user experience
    return (
        <a href={href} target="_blank" rel="noopener noreferrer" {...other}>
            {children}
        </a>
    );
}
