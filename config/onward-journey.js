/**
 * @file
 * Onward Journey configuration.
 *
 * You can look for "data-concept-id" on any stream page to find its UUID,
 * and then prefix this with 'thing/' to use it below.
 *
 * EXAMPLES:

 * Graphics (Methode list): 'list/graphics'
 * World: 'thing/d8009323-f898-3207-b543-eab4427b7a77'
 * UK: 'thing/98815f9a-0c35-3824-98fb-f134965f56b7'
 */

// eslint-disable-next-line no-unused-vars
module.exports = (environment = 'development') => ({
  relatedContent: [{ rows: 1, list: 'thing/1eb4d2f2-618a-39ea-99cf-5cf11287e853' }],
});
