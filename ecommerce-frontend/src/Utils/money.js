export function formatMoney(moneyCents) {
    return (
        `$${(Math.round(moneyCents) / 100).toFixed(2)}`
    )
}