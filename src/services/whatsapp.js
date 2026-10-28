/**
 * PoultryVision WhatsApp Alert Dispatch Service
 * Official Meta WhatsApp Cloud API Integration
 */

export const META_WA_CONFIG = {
  phoneNumberId: import.meta.env.VITE_META_WA_PHONE_NUMBER_ID || '',
  accessToken: import.meta.env.VITE_META_WA_ACCESS_TOKEN || '',
  templateName: import.meta.env.VITE_META_WA_TEMPLATE_NAME || '',
  version: import.meta.env.VITE_META_WA_VERSION || 'v21.0',
};

/**
 * Format a phone number into an international E.164 numeric string without '+'
 * e.g., "+234 803 123 4567" -> "2348031234567"
 * If Nigerian local number starting with 080... -> "23480..."
 */
export function formatWhatsAppNumber(phone) {
  if (!phone) return '';
  let cleaned = phone.replace(/[^0-9]/g, '');
  // If user entered local Nigerian format e.g. 0803..., convert to 234803...
  if (cleaned.startsWith('0') && cleaned.length === 11) {
    cleaned = '234' + cleaned.slice(1);
  }
  return cleaned;
}

/**
 * Generate standard direct wa.me fallback link
 */
export function generateDirectWhatsAppLink(phone, message) {
  const cleanNumber = formatWhatsAppNumber(phone);
  const encodedText = encodeURIComponent(message);
  return cleanNumber ? `https://wa.me/${cleanNumber}?text=${encodedText}` : `https://wa.me/?text=${encodedText}`;
}

/**
 * Dispatch WhatsApp Alert
 * 1. Checks if Meta Cloud API credentials are provided.
 * 2. If present, calls Meta Graph API POST /messages.
 * 3. If credentials missing or error occurs, provides direct link fallback.
 */
export async function sendWhatsAppAlert({ to, message, shedName = 'Shed 01 - Broilers' }) {
  const cleanNumber = formatWhatsAppNumber(to);
  const fallbackUrl = generateDirectWhatsAppLink(to, message);

  const { phoneNumberId, accessToken, templateName, version } = META_WA_CONFIG;

  // Check if Meta credentials exist in environment
  if (!phoneNumberId || !accessToken) {
    return {
      success: false,
      mode: 'missing_credentials',
      fallbackUrl,
      error: 'Meta WhatsApp Cloud API credentials (VITE_META_WA_ACCESS_TOKEN or VITE_META_WA_PHONE_NUMBER_ID) not configured in .env',
    };
  }

  try {
    const endpoint = `https://graph.facebook.com/${version}/${phoneNumberId}/messages`;

    // Construct Meta payload
    let payload;
    if (templateName) {
      payload = {
        messaging_product: 'whatsapp',
        to: cleanNumber,
        type: 'template',
        template: {
          name: templateName,
          language: { code: 'en_US' },
          components: [
            {
              type: 'body',
              parameters: [
                { type: 'text', text: shedName },
                { type: 'text', text: message },
              ],
            },
          ],
        },
      };
    } else {
      payload = {
        messaging_product: 'whatsapp',
        recipient_type: 'individual',
        to: cleanNumber,
        type: 'text',
        text: { preview_url: false, body: message },
      };
    }

    const response = await fetch(endpoint, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    });

    const data = await response.json();

    if (!response.ok) {
      const errorMsg = data?.error?.message || data?.error?.error_user_msg || `Meta API Error (${response.status})`;
      return {
        success: false,
        mode: 'api_error',
        fallbackUrl,
        error: errorMsg,
        details: data,
      };
    }

    const messageId = data?.messages?.[0]?.id || 'WA-MSG-OK';
    return {
      success: true,
      mode: 'meta_cloud_api',
      messageId,
      recipient: cleanNumber,
      fallbackUrl,
    };
  } catch (err) {
    return {
      success: false,
      mode: 'network_error',
      fallbackUrl,
      error: err.message || 'Network error connecting to Meta WhatsApp API',
    };
  }
}
