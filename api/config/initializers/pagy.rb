require 'pagy/extras/headers'

Pagy::DEFAULT[:items] = 10
Pagy::DEFAULT[:headers] = [
  page: 'current-page',
  items: 'per-page',
  count: 'total' 
]

module PagyCustomHeaders
  def pagy_headers(pagy)
    headers = super
    headers['X-Total-Count'] = pagy.count.to_s
    headers['X-Per-Page'] = pagy.items.to_s
    headers['X-Page'] = pagy.page.to_s
    headers['X-Next-Page'] = pagy.next.to_s
    headers['X-Prev-Page'] = pagy.prev.to_s if pagy.prev
    headers
  end
end

# Include the custom headers module in the Pagy::Backend module
Pagy::Backend.prepend(PagyCustomHeaders)
