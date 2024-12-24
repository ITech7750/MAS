from flask import Blueprint, jsonify, request, make_response, Response, json, current_app

blueprint = Blueprint("index", __name__)

asd: "123" = 123

print(asd)
@blueprint.route('/', methods=['GET', 'POST'])
def index():
    # print(request.form)
    # print(request.json)
    # print(request.data)
    # print(request.args)
    # print(request.blueprint)
    # print(request.server)
    # s = make_response(jsonify({"status": True, "polka": 1234, "jopa": False, "ok": True}))
    # s.status_code = 201
    # a = Response('{"a": "a"}', status=200, mimetype='application/json')

    response = current_app.response_class(
        response=json.dumps({"status": "success", "code": 200, "data": {"Name": "Eyong", "Age": 30}}),
        status=200,
        mimetype='application/json'
    )
    return response
