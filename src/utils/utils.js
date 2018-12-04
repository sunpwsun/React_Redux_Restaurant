export function getRandomColor() {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}

export function getDateFromToday( days ) {
    const d = new Date()
    d.setDate( d.getDate() - days )

    return leadingZeros(d.getFullYear(), 4) + '-' +
            leadingZeros(d.getMonth() + 1, 2) + '-' +
            leadingZeros(d.getDate(), 2)
}

export function getTimeStamp() {
    const d = new Date()
    const s =   leadingZeros(d.getFullYear(), 4) + '-' +
                leadingZeros(d.getMonth() + 1, 2) + '-' +
                leadingZeros(d.getDate(), 2) + ' ' +
            
                leadingZeros(d.getHours(), 2) + ':' +
                leadingZeros(d.getMinutes(), 2) + ':' +
                leadingZeros(d.getSeconds(), 2);
  
    return s
}

export function getToday() {
    const d = new Date()
    const s =   leadingZeros(d.getFullYear(), 4) + '-' +
                leadingZeros(d.getMonth() + 1, 2) + '-' +
                leadingZeros(d.getDate(), 2)
    return s
}

export function getTomorrow() {
    const d = new Date()
    const s =   leadingZeros(d.getFullYear(), 4) + '-' +
                leadingZeros(d.getMonth() + 1, 2) + '-' +
                leadingZeros(d.getDate() + 1, 2)
    return s
}

export function leadingZeros( n, digits ) {
    let zero = ''
    n = n.toString()

    if (n.length < digits) {
        for (let i = 0; i < digits - n.length; i++)
        zero += '0'
    }

    return zero + n
}
