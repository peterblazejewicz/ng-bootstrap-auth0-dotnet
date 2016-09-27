/**
 * Shared interface for configuration
 * file with Auth0 details
 * @export
 * @interface AuthConfiguration
 */
export interface AuthConfiguration {
    clientID: string;
    domain: string;
    [x: string]: any;
}
