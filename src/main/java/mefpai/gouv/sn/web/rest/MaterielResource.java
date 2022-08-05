package mefpai.gouv.sn.web.rest;

import java.net.URI;
import java.net.URISyntaxException;
import java.util.List;
import java.util.Objects;
import java.util.Optional;
import javax.validation.Valid;
import javax.validation.constraints.NotNull;
import mefpai.gouv.sn.domain.Materiel;
import mefpai.gouv.sn.repository.MaterielRepository;
import mefpai.gouv.sn.service.MaterielService;
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
 * REST controller for managing {@link mefpai.gouv.sn.domain.Materiel}.
 */
@RestController
@RequestMapping("/api")
public class MaterielResource {

    private final Logger log = LoggerFactory.getLogger(MaterielResource.class);

    private static final String ENTITY_NAME = "materiel";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final MaterielService materielService;

    private final MaterielRepository materielRepository;

    public MaterielResource(MaterielService materielService, MaterielRepository materielRepository) {
        this.materielService = materielService;
        this.materielRepository = materielRepository;
    }

    /**
     * {@code POST  /materiels} : Create a new materiel.
     *
     * @param materiel the materiel to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new materiel, or with status {@code 400 (Bad Request)} if the materiel has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/materiels")
    public ResponseEntity<Materiel> createMateriel(@Valid @RequestBody Materiel materiel) throws URISyntaxException {
        log.debug("REST request to save Materiel : {}", materiel);
        if (materiel.getId() != null) {
            throw new BadRequestAlertException("A new materiel cannot already have an ID", ENTITY_NAME, "idexists");
        }
        Materiel result = materielService.save(materiel);
        return ResponseEntity
            .created(new URI("/api/materiels/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, false, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /materiels/:id} : Updates an existing materiel.
     *
     * @param id the id of the materiel to save.
     * @param materiel the materiel to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated materiel,
     * or with status {@code 400 (Bad Request)} if the materiel is not valid,
     * or with status {@code 500 (Internal Server Error)} if the materiel couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/materiels/{id}")
    public ResponseEntity<Materiel> updateMateriel(
        @PathVariable(value = "id", required = false) final Long id,
        @Valid @RequestBody Materiel materiel
    ) throws URISyntaxException {
        log.debug("REST request to update Materiel : {}, {}", id, materiel);
        if (materiel.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(id, materiel.getId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        if (!materielRepository.existsById(id)) {
            throw new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound");
        }

        Materiel result = materielService.save(materiel);
        return ResponseEntity
            .ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, false, ENTITY_NAME, materiel.getId().toString()))
            .body(result);
    }

    /**
     * {@code PATCH  /materiels/:id} : Partial updates given fields of an existing materiel, field will ignore if it is null
     *
     * @param id the id of the materiel to save.
     * @param materiel the materiel to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated materiel,
     * or with status {@code 400 (Bad Request)} if the materiel is not valid,
     * or with status {@code 404 (Not Found)} if the materiel is not found,
     * or with status {@code 500 (Internal Server Error)} if the materiel couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PatchMapping(value = "/materiels/{id}", consumes = "application/merge-patch+json")
    public ResponseEntity<Materiel> partialUpdateMateriel(
        @PathVariable(value = "id", required = false) final Long id,
        @NotNull @RequestBody Materiel materiel
    ) throws URISyntaxException {
        log.debug("REST request to partial update Materiel partially : {}, {}", id, materiel);
        if (materiel.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(id, materiel.getId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        if (!materielRepository.existsById(id)) {
            throw new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound");
        }

        Optional<Materiel> result = materielService.partialUpdate(materiel);

        return ResponseUtil.wrapOrNotFound(
            result,
            HeaderUtil.createEntityUpdateAlert(applicationName, false, ENTITY_NAME, materiel.getId().toString())
        );
    }

    /**
     * {@code GET  /materiels} : get all the materiels.
     *
     * @param pageable the pagination information.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of materiels in body.
     */
    @GetMapping("/materiels")
    public ResponseEntity<List<Materiel>> getAllMateriels(Pageable pageable) {
        log.debug("REST request to get a page of Materiels");
        Page<Materiel> page = materielService.findAll(pageable);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(ServletUriComponentsBuilder.fromCurrentRequest(), page);
        return ResponseEntity.ok().headers(headers).body(page.getContent());
    }

    /**
     * {@code GET  /materiels/:id} : get the "id" materiel.
     *
     * @param id the id of the materiel to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the materiel, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/materiels/{id}")
    public ResponseEntity<Materiel> getMateriel(@PathVariable Long id) {
        log.debug("REST request to get Materiel : {}", id);
        Optional<Materiel> materiel = materielService.findOne(id);
        return ResponseUtil.wrapOrNotFound(materiel);
    }

    /**
     * {@code DELETE  /materiels/:id} : delete the "id" materiel.
     *
     * @param id the id of the materiel to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/materiels/{id}")
    public ResponseEntity<Void> deleteMateriel(@PathVariable Long id) {
        log.debug("REST request to delete Materiel : {}", id);
        materielService.delete(id);
        return ResponseEntity
            .noContent()
            .headers(HeaderUtil.createEntityDeletionAlert(applicationName, false, ENTITY_NAME, id.toString()))
            .build();
    }
}
