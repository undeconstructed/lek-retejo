---
title: Kontaktu
weight: 80
menu: main
---

# Kontaku nin

<div class="form" id="contactform">
  <form id="formContactUs">
    <input type="hidden" id="formContactUs_Age" data-post-name="Age" />
    <div class="line">
      <div class="cell">
        <div class="cell-header"><label for="formContactUs_FirstName">Persona nomo / First Name <abbr class="required" title="deviga/required">*</abbr></label></div>
        <div class="cell-body"><input id="formContactUs_FirstName" data-post-name="FirstName" type="text" required></div>
      </div>
    </div>
    <div class="line">
      <div class="cell">
        <div class="cell-header"><label for="formContactUs_LastName">Familia nomo / Last Name <abbr class="required" title="deviga/required">*</abbr></label></div>
        <div class="cell-body"><input id="formContactUs_LastName" data-post-name="LastName" type="text" required></div>
      </div>
    </div>
    <div class="line">
      <div class="cell">
        <div class="cell-header"><label for="formContactUs_Email">Retpoŝtadreso / Email address <abbr class="required" title="deviga/required">*</abbr></label></div>
        <div class="cell-body"><input id="formContactUs_Email" data-post-name="Email" type="email" required></div>
      </div>
    </div>
    <div class="line">
      <div class="cell">
        <div class="cell-header"><label for="formContactUs_Message">Mesaĝo / Message <abbr class="required" title="deviga/required">*</abbr></label></div>
        <div class="cell-body h-220"><textarea id="formContactUs_Message" data-post-name="Message" required></textarea></div>
      </div>
    </div>
    <div class="msg working">
      <div class="cell">
        <div class="cell-body">Bonvolu atendi. / Please wait.</div>
      </div>
    </div>
    <div class="msg success">
      <div class="cell">
        <div class="cell-body">Dankon! Via mesaĝo estas sendita. Ni respondos baldaŭ! / Thank you! Your message has been sent. We will get back to you shortly.</div>
      </div>
    </div>
    <div class="msg invalid">
      <div class="cell">
        <div class="cell-body">Bonovlu plenigi la bezonatajn kampojn. / Please fill in the required fields.</div>
      </div>
    </div>
    <div class="msg error">
      <div class="cell">
        <div class="cell-body">Okazis eraro dum sendo de la mesaĝo. Bonvolu provi denove. / An errored occured while sending the message. Please try again.</div>
      </div>
    </div>
    <div class="line">
      <div class="cell buttons">
        <div class="cell-body"><button type="submit" data-button-submit>Sendu / Send</button></div>
      </div>
    </div>
  </form>
</div>
