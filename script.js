const scroll = document.querySelector('.scroll')
const track = document.querySelector('.track')
const thumb = document.querySelector('.thumb')
const component = document.querySelector('.component')

const resizeObserver = new ResizeObserver((entries) => {
  const { scrollHeight, clientHeight } = scroll
  track.style.display = scrollHeight === clientHeight ? 'none' : 'block'
  thumb.style.height =
    ((clientHeight / scrollHeight) * clientHeight).toFixed(2) + 'px'
  positionThumb()
})
resizeObserver.observe(scroll)

function positionThumb() {
  const thumbScrollTop =
    (scroll.scrollTop / (scroll.scrollHeight - scroll.clientHeight)) *
    (scroll.clientHeight - thumb.clientHeight)
  thumb.style.top = `${thumbScrollTop}px`
}
scroll.addEventListener('scroll', positionThumb)

let startY
let startTop
let isDragging = false
let mouseEntered = false

thumb.addEventListener('mousedown', (event) => {
  isDragging = true
  startY = event.clientY
  startTop = parseFloat(getComputedStyle(thumb).top)

  // Prevent text selection during dragging
  event.preventDefault()
})

document.addEventListener('mousemove', (event) => {
  if (!isDragging) return

  const deltaY = event.clientY - startY
  const newY = startTop + deltaY

  // Ensure the thumb stays within the scroll's boundaries
  const containerHeight = scroll.clientHeight
  const elementHeight = thumb.clientHeight
  const maxTop = containerHeight - elementHeight
  const newTop = Math.min(Math.max(newY, 0), maxTop)
  thumb.style.top = newTop + 'px'

  const thumbSpace = scroll.clientHeight - thumb.clientHeight
  const scrollJump = (scroll.scrollHeight - scroll.clientHeight) / thumbSpace
  scroll.scrollTop = newTop * scrollJump
})

document.addEventListener('mouseup', () => {
  isDragging = false
  toggleThumbOpacity()()
})

component.addEventListener('mouseenter', toggleThumbOpacity(true))
component.addEventListener('mouseleave', toggleThumbOpacity(false))

function toggleThumbOpacity(entered) {
  return () => {
    if (typeof entered === 'boolean') mouseEntered = entered
    console.log({ mouseEntered, isDragging })
    track.style.opacity = mouseEntered || isDragging ? 1 : 0
  }
}
