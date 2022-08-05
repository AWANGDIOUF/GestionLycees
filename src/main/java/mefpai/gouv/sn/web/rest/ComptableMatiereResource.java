package mefpai.gouv.sn.web.rest;

import java.net.URI;
import java.net.URISyntaxException;
import java.util.List;
import java.util.Objects;
import java.util.Optional;
import javax.validation.Valid;
import javax.validation.constraints.NotNull;
import mefpai.gouv.sn.domain.ComptableMatiere;
import mefpai.gouv.sn.repository.ComptableMatiereRepository;
import mefpai.gouv.sn.service.ComptableMatiereService;
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
 * REST controller for managing {@link mefpai.gouv.sn.domain.ComptableMatiere}.
 */
@RestController
@RequestMapping("/api")
public class ComptableMatiereResource {

    private final Logger log = LoggerFactory.getLogger(ComptableMatiereResource.class);

    private static final String ENTITY_NAME = "comptableMatiere";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final ComptableMatiereService comptableMatiereService;

    private final ComptableMatiereRepository comptableMatiereRepository;

    public ComptableMatiereResource(
        ComptableMatiereService comptableMatiereService,
        ComptableMatiereRepository comptableMatiereRepository
    ) {
        this.comptableMatiereService = comptableMatiereService;
        this.comptableMatiereRepository = comptableMatiereRepository;
    }

    /**
     * {@code POST  /comptable-matieres} : Create a new comptableMatiere.
     *
     * @param comptableMatiere the comptableMatiere to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new comptableMatiere, or with status {@code 400 (Bad Request)} if the comptableMatiere has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/comptable-matieres")
    public ResponseEntity<ComptableMatiere> createComptableMatiere(@Valid @RequestBody ComptableMatiere comptableMatiere)
        throws URISyntaxException {
        log.debug("REST request to save ComptableMatiere : {}", comptableMatiere);
        if (comptableMatiere.getId() != null) {
            throw new BadRequestAlertException("A new comptableMatiere cannot already have an ID", ENTITY_NAME, "idexists");
        }
        ComptableMatiere result = comptableMatiereService.save(comptableMatiere);
        return ResponseEntity
            .created(new URI("/api/comptable-matieres/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, false, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /comptable-matieres/:id} : Updates an existing comptableMatiere.
     *
     * @param id the id of the comptableMatiere to save.
     * @param comptableMatiere the comptableMatiere to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated comptableMatiere,
     * or with status {@code 400 (Bad Request)} if the comptableMatiere is not valid,
     * or with status {@code 500 (Internal Server Error)} if the comptableMatiere couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/comptable-matieres/{id}")
    public ResponseEntity<ComptableMatiere> updateComptableMatiere(
        @PathVariable(value = "id", required = false) final Long id,
        @Valid @RequestBody ComptableMatiere comptableMatiere
    ) throws URISyntaxException {
        log.debug("REST request to update ComptableMatiere : {}, {}", id, comptableMatiere);
        if (comptableMatiere.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(id, comptableMatiere.getId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        if (!comptableMatiereRepository.existsById(id)) {
            throw new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound");
        }

        ComptableMatiere result = comptableMatiereService.save(comptableMatiere);
        return ResponseEntity
            .ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, false, ENTITY_NAME, comptableMatiere.getId().toString()))
            .body(result);
    }

    /**
     * {@code PATCH  /comptable-matieres/:id} : Partial updates given fields of an existing comptableMatiere, field will ignore if it is null
     *
     * @param id the id of the comptableMatiere to save.
     * @param comptableMatiere the comptableMatiere to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated comptableMatiere,
     * or with status {@code 400 (Bad Request)} if the comptableMatiere is not valid,
     * or with status {@code 404 (Not Found)} if the comptableMatiere is not found,
     * or with status {@code 500 (Internal Server Error)} if the comptableMatiere couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PatchMapping(value = "/comptable-matieres/{id}", consumes = "application/merge-patch+json")
    public ResponseEntity<ComptableMatiere> partialUpdateComptableMatiere(
        @PathVariable(value = "id", required = false) final Long id,
        @NotNull @RequestBody ComptableMatiere comptableMatiere
    ) throws URISyntaxException {
        log.debug("REST request to partial update ComptableMatiere partially : {}, {}", id, comptableMatiere);
        if (comptableMatiere.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(id, comptableMatiere.getId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        if (!comptableMatiereRepository.existsById(id)) {
            throw new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound");
        }

        Optional<ComptableMatiere> result = comptableMatiereService.partialUpdate(comptableMatiere);

        return ResponseUtil.wrapOrNotFound(
            result,
            HeaderUtil.createEntityUpdateAlert(applicationName, false, ENTITY_NAME, comptableMatiere.getId().toString())
        );
    }

    /**
     * {@code GET  /comptable-matieres} : get all the comptableMatieres.
     *
     * @param pageable the pagination information.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of comptableMatieres in body.
     */
    @GetMapping("/comptable-matieres")
    public ResponseEntity<List<ComptableMatiere>> getAllComptableMatieres(Pageable pageable) {
        log.debug("REST request to get a page of ComptableMatieres");
        Page<ComptableMatiere> page = comptableMatiereService.findAll(pageable);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(ServletUriComponentsBuilder.fromCurrentRequest(), page);
        return ResponseEntity.ok().headers(headers).body(page.getContent());
    }

    /**
     * {@code GET  /comptable-matieres/:id} : get the "id" comptableMatiere.
     *
     * @param id the id of the comptableMatiere to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the comptableMatiere, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/comptable-matieres/{id}")
    public ResponseEntity<ComptableMatiere> getComptableMatiere(@PathVariable Long id) {
        log.debug("REST request to get ComptableMatiere : {}", id);
        Optional<ComptableMatiere> comptableMatiere = comptableMatiereService.findOne(id);
        return ResponseUtil.wrapOrNotFound(comptableMatiere);
    }

    /**
     * {@code DELETE  /comptable-matieres/:id} : delete the "id" comptableMatiere.
     *
     * @param id the id of the comptableMatiere to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/comptable-matieres/{id}")
    public ResponseEntity<Void> deleteComptableMatiere(@PathVariable Long id) {
        log.debug("REST request to delete ComptableMatiere : {}", id);
        comptableMatiereService.delete(id);
        return ResponseEntity
            .noContent()
            .headers(HeaderUtil.createEntityDeletionAlert(applicationName, false, ENTITY_NAME, id.toString()))
            .build();
    }
}
