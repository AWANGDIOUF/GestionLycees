package mefpai.gouv.sn.web.rest;

import java.net.URI;
import java.net.URISyntaxException;
import java.util.List;
import java.util.Objects;
import java.util.Optional;
import javax.validation.Valid;
import javax.validation.constraints.NotNull;
import mefpai.gouv.sn.domain.Proviseur;
import mefpai.gouv.sn.repository.ProviseurRepository;
import mefpai.gouv.sn.service.ProviseurService;
import mefpai.gouv.sn.web.rest.errors.BadRequestAlertException;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpHeaders;
// import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;
import tech.jhipster.web.util.HeaderUtil;
import tech.jhipster.web.util.PaginationUtil;
import tech.jhipster.web.util.ResponseUtil;

/**
 * REST controller for managing {@link mefpai.gouv.sn.domain.Proviseur}.
 */
@RestController
@RequestMapping("/api")
public class ProviseurResource {

    private final Logger log = LoggerFactory.getLogger(ProviseurResource.class);

    private static final String ENTITY_NAME = "proviseur";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final ProviseurService proviseurService;

    private final ProviseurRepository proviseurRepository;

    public ProviseurResource(ProviseurService proviseurService, ProviseurRepository proviseurRepository) {
        this.proviseurService = proviseurService;
        this.proviseurRepository = proviseurRepository;
    }

    /**
     * {@code POST  /proviseurs} : Create a new proviseur.
     *
     * @param proviseur the proviseur to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new proviseur, or with status {@code 400 (Bad Request)} if the proviseur has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/proviseurs")
    public ResponseEntity<Proviseur> createProviseur(@Valid @RequestBody Proviseur proviseur) throws URISyntaxException {
        log.debug("REST request to save Proviseur : {}", proviseur);
        if (proviseur.getId() != null) {
            throw new BadRequestAlertException("A new proviseur cannot already have an ID", ENTITY_NAME, "idexists");
        }
        Proviseur result = proviseurService.save(proviseur);
        return ResponseEntity
            .created(new URI("/api/proviseurs/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, false, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /proviseurs/:id} : Updates an existing proviseur.
     *
     * @param id the id of the proviseur to save.
     * @param proviseur the proviseur to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated proviseur,
     * or with status {@code 400 (Bad Request)} if the proviseur is not valid,
     * or with status {@code 500 (Internal Server Error)} if the proviseur couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/proviseurs/{id}")
    public ResponseEntity<Proviseur> updateProviseur(
        @PathVariable(value = "id", required = false) final Long id,
        @Valid @RequestBody Proviseur proviseur
    ) throws URISyntaxException {
        log.debug("REST request to update Proviseur : {}, {}", id, proviseur);
        if (proviseur.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(id, proviseur.getId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        if (!proviseurRepository.existsById(id)) {
            throw new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound");
        }

        Proviseur result = proviseurService.save(proviseur);
        return ResponseEntity
            .ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, false, ENTITY_NAME, proviseur.getId().toString()))
            .body(result);
    }

    /**
     * {@code PATCH  /proviseurs/:id} : Partial updates given fields of an existing proviseur, field will ignore if it is null
     *
     * @param id the id of the proviseur to save.
     * @param proviseur the proviseur to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated proviseur,
     * or with status {@code 400 (Bad Request)} if the proviseur is not valid,
     * or with status {@code 404 (Not Found)} if the proviseur is not found,
     * or with status {@code 500 (Internal Server Error)} if the proviseur couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PatchMapping(value = "/proviseurs/{id}", consumes = "application/merge-patch+json")
    public ResponseEntity<Proviseur> partialUpdateProviseur(
        @PathVariable(value = "id", required = false) final Long id,
        @NotNull @RequestBody Proviseur proviseur
    ) throws URISyntaxException {
        log.debug("REST request to partial update Proviseur partially : {}, {}", id, proviseur);
        if (proviseur.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(id, proviseur.getId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        if (!proviseurRepository.existsById(id)) {
            throw new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound");
        }

        Optional<Proviseur> result = proviseurService.partialUpdate(proviseur);

        return ResponseUtil.wrapOrNotFound(
            result,
            HeaderUtil.createEntityUpdateAlert(applicationName, false, ENTITY_NAME, proviseur.getId().toString())
        );
    }

    /**
     * {@code GET  /proviseurs} : get all the proviseurs.
     *
     * @param pageable the pagination information.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of proviseurs in body.
     */
    @GetMapping("/proviseurs")
    public ResponseEntity<List<Proviseur>> getAllProviseurs(Pageable pageable) {
        log.debug("REST request to get a page of Proviseurs");
        Page<Proviseur> page = proviseurService.findAll(pageable);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(ServletUriComponentsBuilder.fromCurrentRequest(), page);
        return ResponseEntity.ok().headers(headers).body(page.getContent());
    }

    /**
     * {@code GET  /proviseurs/:id} : get the "id" proviseur.
     *
     * @param id the id of the proviseur to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the proviseur, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/proviseurs/{id}")
    public ResponseEntity<Proviseur> getProviseur(@PathVariable Long id) {
        log.debug("REST request to get Proviseur : {}", id);
        Optional<Proviseur> proviseur = proviseurService.findOne(id);
        return ResponseUtil.wrapOrNotFound(proviseur);
    }

    /**
     * {@code DELETE  /proviseurs/:id} : delete the "id" proviseur.
     *
     * @param id the id of the proviseur to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/proviseurs/{id}")
    public ResponseEntity<Void> deleteProviseur(@PathVariable Long id) {
        log.debug("REST request to delete Proviseur : {}", id);
        proviseurService.delete(id);
        return ResponseEntity
            .noContent()
            .headers(HeaderUtil.createEntityDeletionAlert(applicationName, false, ENTITY_NAME, id.toString()))
            .build();
    }
}
