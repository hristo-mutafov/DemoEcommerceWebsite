export default function isEmpty(fields) {
    for (const field of Object.values(fields)) {
        if (!field.value) {
            return false;
        }
    }
    return true;
}
