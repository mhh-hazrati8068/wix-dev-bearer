import { shippingRates } from "@wix/ecom/service-plugins";
import { checkout } from "@wix/ecom";

console.log("checkout", checkout);
// Define the ShippingRate type if not already defined
type ShippingRate = {
  cost: {
    price: string;
    currency: string;
  };
  price_object: {
    delivery_price: string;
  };
  // Add other properties as needed
};

checkout.onCheckoutCreated((event) => {
  return console.log("start");
});

checkout.onCheckoutCompleted((event) => {
  console.log("Done");
});

async function pricingFunction(payload: any) {
  const { request, metadata } = payload;
  const postalCode = request.shippingDestination?.postal_code;
  const addressLine1 = request.shippingDestination?.addressLine1;
  const city = request.shippingDestination?.city;
  const country = request.shippingDestination?.country;
  const addressLine2 = request.shippingDestination?.addressLine2;
  const addressLine = request.shippingDestination?.addressLine;
  const subdivision = request.shippingDestination?.subdivision;

  const api_key = "YkPcjp57";
  const api_secret = "x3wKiCHS4XTfCeaOGDPz";
  const credentials = btoa(`${api_key}:${api_secret}`);
  // Simulate an API call to calculate shipping rates
  console.log("runs")
  const shippingData = await fetch(
    "https://us-central1-bearer-seyco-development.cloudfunctions.net/pricingAPIv1dot0",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Basic ${credentials}`,
      },
      body: JSON.stringify({
        address1: addressLine,
        city_suburb_name: city,
        country_name: country,
        postal_code: postalCode,
        state_name_code: subdivision,
        parcel_weight: 0.1,
        intermediate_api_platform: "Mir Co Pty Ltd",
        intermediate_api_provider: "Bearer",
      }),
    }
  ).then((res) => res.json());
}

shippingRates.provideHandlers({
  getShippingRates: async (payload) => {
    pricingFunction(payload);
    return {
      shippingRates: [
        {
          title: "Bearer",
          logistics: {
            deliveryTime: "90 minutes",
          },
          cost: {
            price: `90`,
            currency: "USD",
            additionalCharges: [
              {
                price: "10",
                // type: "FEE", // Adjusted to a valid ChargeType value
                details: "Handling fee of $5 applied for fragile items.",
              },
            ],
          },
        },
      ],
    };
  },
});
