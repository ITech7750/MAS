export function usePython(route, data, func, depend = []) {
    fetch(route, data).then(res => res.json()).then(data => {
        func(data);
    }).catch(function(e) {
        console.log('Request failed', e)
    });
}