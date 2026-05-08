import * as React from 'react';
import classNames from 'classnames';
import Markdown from 'markdown-to-jsx';

import { mapStylesToClassNames as mapStyles } from '../../../../utils/map-styles-to-class-names';
import Action from '../../../atoms/Action';

export default function FeaturedItem(props) {
    const { elementId, title, tagline, subtitle, text, image, actions = [], colors = 'bg-light-fg-dark', styles = {}, hasSectionTitle } = props;
    const fieldPath = props['data-sb-field-path'];
    const TitleTag = hasSectionTitle ? 'h3' : 'h2';
    
    const hasImage = !!(image?.url || image?.altText);

    // Check if this is a testimonial
    const isTestimonial = !!(tagline && subtitle && text && image?.altText && !image?.url);

    // Card classes - basic styling without hover effects or outlines
    const cardClasses = classNames(
        'sb-card',
        colors,
        styles?.self?.margin ? mapStyles({ margin: styles?.self?.margin }) : undefined,
        styles?.self?.padding ? mapStyles({ padding: styles?.self?.padding }) : 'p-4',
        styles?.self?.borderRadius ? mapStyles({ borderRadius: styles?.self?.borderRadius }) : 'rounded-lg',
        styles?.self?.textAlign ? mapStyles({ textAlign: styles?.self?.textAlign }) : undefined,
        'overflow-hidden',
        'relative',
        'h-full',
        'flex',
        'flex-col'
    );

    return (
        <div
            id={elementId}
            className={cardClasses}
            data-sb-field-path={fieldPath}
        >
            {/* Image on top */}
            {hasImage && !isTestimonial && image.url && (
                <div className="mb-4 flex-shrink-0 relative z-10 overflow-hidden rounded-lg group">
                    <img
                        src={image.url}
                        alt={image.altText || ''}
                        className="w-full h-auto object-cover block transition-transform duration-500 group-hover:scale-110"
                        style={{ maxWidth: '100%', display: 'block' }}
                    />
                </div>
            )}

            {/* Text content below */}
            <div className="flex flex-col flex-1 relative z-10">
                {tagline && !isTestimonial && (
                    <p className="text-xs text-primary font-medium" {...(fieldPath && { 'data-sb-field-path': '.tagline' })}>
                        {tagline}
                    </p>
                )}
                {title && (
                    <TitleTag
                        className={classNames('text-xl font-semibold', {
                            'mt-1': tagline
                        })}
                        {...(fieldPath && { 'data-sb-field-path': '.title' })}
                    >
                        {title}
                    </TitleTag>
                )}
                {subtitle && !isTestimonial && (
                    <p
                        className={classNames('text-sm', {
                            'mt-1': tagline || title
                        })}
                        {...(fieldPath && { 'data-sb-field-path': '.subtitle' })}
                    >
                        {subtitle}
                    </p>
                )}
                {text && (
                    <div
                        className={classNames('text-base text-neutral-600 mt-3', {
                            'mt-3': tagline || title || subtitle
                        })}
                        {...(fieldPath && { 'data-sb-field-path': '.text' })}
                    >
                        <Markdown>{text}</Markdown>
                    </div>
                )}
                {isTestimonial && (
                    <div className="mt-4 pt-4 border-t border-gray-200 flex items-center gap-4">
                        <div className="w-14 h-14 rounded-full bg-green-700 flex items-center justify-center text-white text-xl font-semibold overflow-hidden border-2 border-green-200 flex-shrink-0">
                            {image.altText.charAt(0).toUpperCase()}
                        </div>
                        <div>
                            <p className="font-semibold text-gray-900">{image?.altText}</p>
                            <p className="text-sm text-gray-500">{subtitle} | {tagline}</p>
                        </div>
                    </div>
                )}
                {actions.length > 0 && (
                    <div
                        className="mt-4 w-full flex justify-center"
                        {...(fieldPath && { 'data-sb-field-path': '.actions' })}
                    >
                        {actions.map((action, actionIndex) => (
                            <Action
                                key={actionIndex}
                                {...action}
                                className="text-sm"
                            />
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}