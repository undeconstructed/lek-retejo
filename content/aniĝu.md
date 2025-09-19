---
title: Aniĝu
summary: Ĉi tiel oni povas iĝi ano de la Londona Esperanto-Klubo
weight: 90
menu: main
---

# Aniĝu

La Londona Esperanto-Klubo bonvenigas vizitantojn, tamen se vi volas pli subteni la klubon, kial ne aniĝi?
Via kotizo validos ĝis la venonta 31-a de decembro.

<div class="form" id="joinform">
  <form id="formRegister">
    <input type="hidden" id="formRegister_Age" data-post-name="Age" />
    <div class="line">
      <div class="cell">
        <div class="cell-header"><label for="formRegister_FirstName">Persona nomo: <abbr class="required" title="deviga">*</abbr></label></div>
        <div class="cell-body"><input id="formRegister_FirstName" data-post-name="FirstName" type="text" required maxlength="50"></div>
      </div>
      <div class="cell">
        <div class="cell-header"><label for="formRegister_LastName">Familia nomo: <abbr class="required" title="deviga">*</abbr></label></div>
        <div class="cell-body"><input id="formRegister_LastName" data-post-name="LastName" type="text" required maxlength="50"></div>
      </div>
    </div>
    <div class="line">
      <div class="cell split3">
        <div class="cell-header"><label for="formRegister_Email">Retpoŝtadreso: <abbr class="required" title="deviga">*</abbr></label></div>
        <div class="cell-body"><input id="formRegister_Email" data-post-name="Email" type="email" required maxlength="250"></div>
      </div>
      <div class="cell">
        <div class="cell-header"><label for="formRegister_Phone">Telefon-numero:</label></div>
        <div class="cell-body"><input id="formRegister_Phone" data-post-name="Phone" type="tel" maxlength="20"></div>
      </div>
    </div>
    <div class="line">
      <div class="cell">
        <div class="cell-header"><label for="formRegister_AddressLine1">Adreso (linio 1): <abbr class="required" title="deviga">*</abbr></label></div>
        <div class="cell-body"><input id="formRegister_AddressLine1" data-post-name="AddressLine1" type="text" required maxlength="100"></div>
      </div>
    </div>
    <div class="line">
      <div class="cell">
        <div class="cell-header"><label for="formRegister_AddressLine2">Adreso (linio 2):</label></div>
        <div class="cell-body"><input id="formRegister_AddressLine2" data-post-name="AddressLine2" type="text" maxlength="100"></div>
      </div>
    </div>
    <div class="line">
      <div class="cell">
        <div class="cell-header"><label for="formRegister_AddressLine1">Adreso (linio 3):</label></div>
        <div class="cell-body"><input id="formRegister_AddressLine3" data-post-name="AddressLine3" type="text" maxlength="100"></div>
      </div>
    </div>
    <div class="line">
      <div class="cell">
        <div class="cell-header"><label for="formRegister_Postcode">Poŝtkodo: <abbr class="required" title="deviga">*</abbr></label></div>
        <div class="cell-body"><input id="formRegister_Postcode" data-post-name="Postcode" type="text" required maxlength="20"></div>
      </div>
        <div class="cell split3">
        <div class="cell-header"><label for="formRegister_Town">Urbo: <abbr class="required" title="deviga">*</abbr></label></div>
        <div class="cell-body"><input id="formRegister_Town" data-post-name="Town" type="text" required maxlength="50"></div>
      </div>
        <div class="cell split3">
        <div class="cell-header"><label for="formRegister_Country">Lando: <abbr class="required" title="deviga">*</abbr></label></div>
        <div class="cell-body"><input id="formRegister_Country" data-post-name="Country" type="text" required maxlength="50"></div>
      </div>
    </div>
    <hr class="line" />
    <div class="line">
      <div class="cell split6">
        <div class="cell-header"><label for="formRegister_MemberTypeId">Kotizo: <abbr class="required" title="deviga">*</abbr></label> (pago per bank-karto)</div>
        <div class="cell-body">
          <select id="formRegister_MemberTypeId" data-post-name="MemberTypeId" data-get-api-key="HAX30TC7N2" required>
            <option value="">Elektu...</option>
            <option value="1">Ordinara: £15</option>
            <option value="5">Fora (pli ol 40 km de CHX): £9</option>
          </select>
        </div>
      </div>
      <div class="cell">
        <div class="cell-header"><label for="formRegister_Donation">Donaco (£):</label></div>
        <div class="cell-body"><input id="formRegister_Donation" data-post-name="Donation" type="number" value="0" min="0" step="any"></div>
      </div>
      <div class="cell split6">
        <div class="cell-header"><label for="formRegister_PaperNewsletter">Liverado de bulteno: <abbr class="required" title="deviga">*</abbr></label></div>
        <div class="cell-body">
          <select id="formRegister_PaperNewsletter" data-post-name="PaperNewsletter" required>
            <option value="">Elektu...</option>
            <option value="0">Nur retpoŝte</option>
            <option value="1">Retpoŝte kaj leterpoŝte</option>
          </select>
        </div>
      </div>
    </div>
    <hr class="line" />
    <div class="line">
      <div class="cell">
        <div class="cell-body checkbox">
          <input type="checkbox" id="formRegister_Rules" required> <label class="font-weight-normal" for="formRegister_Rules">Per ĉi tio mi konfirmas, ke mi deziras (r)esti membro de Londona Esperanto-Klubo, kaj akceptas la <a href="/doc/lek_regularo.pdf">klubajn regulojn</a> (<a href="/doc/lek_regularo_libreto.pdf">presebla versio</a>).</label>
        </div>
      </div>
    </div>
    <hr class="line" />
    <div class="msg working">
      <div class="cell">
        <div class="cell-body">Bonvolu atendi.</div>
      </div>
    </div>
    <div class="msg success">
      <div class="cell">
        <div class="cell-body">Dankon! Vi baldaŭ ricevos retmesaĝon por konfirmi vian aniĝon.</div>
      </div>
    </div>
    <div class="msg invalid">
      <div class="cell">
        <div class="cell-body">Bonovlu plenigi la bezonatajn kampojn, kaj konfirmi kaj vi akceptas la regulojn.</div>
      </div>
    </div>
    <div class="msg error">
      <div class="cell">
        <div class="cell-body">Okazis eraro dum sendo de la mesaĝo. Bonvolu provi denove.</div>
      </div>
    </div>
    <div class="line">
      <div class="cell buttons">
        <div class="cell-body"><button type="submit" data-button-submit>Sendu</button></div>
      </div>
    </div>
  </form>
</div>
