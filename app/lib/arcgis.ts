import OAuthInfo from "@arcgis/core/identity/OAuthInfo";
import IdentityManager from "@arcgis/core/identity/IdentityManager";
import Portal from "@arcgis/core/portal/Portal";
import WebMap from "@arcgis/core/WebMap";
import MapView from "@arcgis/core/views/MapView";

export class ArcGISAuth {
  private oauthInfo: OAuthInfo;
  private portal: Portal | null = null;

  constructor(appId: string, portalUrl: string = "https://www.arcgis.com") {
    this.oauthInfo = new OAuthInfo({
      appId: appId, // Your OAuth app ID from portal
      portalUrl: portalUrl + "/sharing",
      popup: false // Use redirect flow instead of popup
    });

    IdentityManager.registerOAuthInfos([this.oauthInfo]);
  }

  async checkSignInStatus(): Promise<boolean> {
    try {
      await IdentityManager.checkSignInStatus(this.oauthInfo.portalUrl);
      return true;
    } catch {
      return false;
    }
  }

  async signIn(): Promise<Portal> {
    try {
      const credential = await IdentityManager.getCredential(this.oauthInfo.portalUrl);
      
      this.portal = new Portal({
        url: this.oauthInfo.portalUrl.replace("/sharing", ""),
        authMode: "immediate"
      });

      await this.portal.load();
      return this.portal;
    } catch (error) {
      throw new Error(`Authentication failed: ${error}`);
    }
  }

  async signOut(): Promise<void> {
    IdentityManager.destroyCredentials();
    this.portal = null;
  }

  getPortal(): Portal | null {
    return this.portal;
  }
}

// Initialize ArcGIS authentication
export const arcgisAuth = new ArcGISAuth(
  process.env.NEXT_PUBLIC_ARCGIS_OAUTH_APP_ID!,
  process.env.NEXT_PUBLIC_ARCGIS_PORTAL_URL
);
