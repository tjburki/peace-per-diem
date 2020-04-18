export const isToday = (date) => {
    const today = new Date();
    return date && typeof(date.getDate) === 'function' && 
        date.getDate() === today.getDate() && 
        date.getMonth() === today.getMonth() && 
        date.getFullYear() === today.getFullYear();
}