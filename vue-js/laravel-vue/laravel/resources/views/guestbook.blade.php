<!DOCTYPE html>
<html>
<head>
  <meta id="token" name="token" value="{{ csrf_token() }}">
  <title>Guestbook</title>
  <link rel="stylesheet" type="text/css" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.6/css/bootstrap.min.css">
  <style type="text/css">
  .error {
    font-weight: bold;
    color: red;
  }
  </style>
</head>
<body class="container" style="padding:2em;">
<div id="guestbook">

  <form method="POST" v-on:submit="onSubmitForm">
    <div class="form-group">
      <label for="name">
        Name:
        <span class="error" v-show="!newMessage.name">*</span>
      </label>
      <input type="text" name="name" id="name" class="form-control" v-model="newMessage.name">
    </div>

    <div class="form-group">
      <label for="message">
        Message:
        <span class="error" v-show="!newMessage.message">*</span>
      </label>
      <textarea type="text" name="message" id="message" class="form-control" v-model="newMessage.message"></textarea>
    </div>

    <div class="form-group" v-show="!submitted">
      <button type="submit" class="btn btn-default" v-bind:disabled="errors">Sign Guestbook</button>
    </div>
    <div class="alert alert-success" v-show="submitted">Thanks</div>
  </form>

  <hr>

  <article v-for="message in messages">
    <h3>@{{ message.name }}</h3>
    <div class="body">@{{ message.message }}</div>
  </article>
  <pre> @{{ $data | json }}</pre>
</div>

<script type="text/javascript" src="/js/vendor.js"></script>
<script type="text/javascript" src="/js/guestbook.js"></script>
</body>
</html>