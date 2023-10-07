const b1 = document.querySelector('#b1')
const b2 = document.querySelector('#b2')
const b3 = document.querySelector('#b3')
const b4 = document.querySelector('#b4')

const p1 = document.querySelector('#p1')
const p2 = document.querySelector('#p2')
const p3 = document.querySelector('#p3')
const p4 = document.querySelector('#p4')

const offclick = document.querySelector('#offclick')

const toggle = (el) => () => el.classList.toggle('none')

b1.addEventListener('click', toggle(p1))
b2.addEventListener('click', toggle(p2))
b3.addEventListener('click', toggle(p3))
b4.addEventListener('click', toggle(p4))

p1.addEventListener('click', toggle(p1))
p2.addEventListener('click', toggle(p2))
p3.addEventListener('click', toggle(p3))
p4.addEventListener('click', toggle(p4))

offclick.addEventListener('click', () => console.log('click vayo'))
