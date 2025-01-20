let stripe;

async function initializeStripe() {
    const response = await fetch('/api/config'); // Always call /api/config
    const { publishableKey } = await response.json();
    stripe = Stripe(publishableKey);
}

document.addEventListener('DOMContentLoaded', async function() {
    await initializeStripe();

    document.querySelectorAll('.select-plan').forEach(button => {
        button.addEventListener('click', async (e) => {
            if (!stripe) return;

            const priceId = e.target.dataset.priceId;
            const response = await fetch('/api/create-checkout-session', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ priceId }),
            });

            const { url } = await response.json();
            if (url) window.location.href = url;
        });
    });
});