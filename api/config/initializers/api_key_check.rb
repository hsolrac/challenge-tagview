class ApiKeyCheck
  def initialize(app)
    @app = app
  end

  def call(env)
    request = Rack::Request.new(env)

    if request.path.start_with?('/api') && request.env['HTTP_X_API_KEY'] != 'tagview-desafio-2024'
      return [401, { 'Content-Type' => 'application/json' }, ['Unauthorized']]
    end

    @app.call(env)
  end
end
