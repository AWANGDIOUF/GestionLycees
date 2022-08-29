package mefpai.gouv.sn.web.rest;

import java.net.URI;
import java.net.URISyntaxException;
import java.util.List;
import java.util.Objects;
import java.util.Optional;
import javax.validation.Valid;
import javax.validation.constraints.NotNull;
import mefpai.gouv.sn.domain.ComptableFinancier;
import mefpai.gouv.sn.repository.ComptableFinancierRepository;
import mefpai.gouv.sn.service.ComptableFinancierService;
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
 * REST controller for managing {@link mefpai.gouv.sn.domain.ComptableFinancier}.
 */
@RestController
@RequestMapping("/api")
public class ComptableFinancierResource {

    private final Logger log = LoggerFactory.getLogger(ComptableFinancierResource.class);

    private static final String ENTITY_NAME = "comptableFinancier";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final ComptableFinancierService comptableFinancierService;

    private final ComptableFinancierRepository comptableFinancierRepository;

    public ComptableFinancierResource(
        ComptableFinancierService comptableFinancierService,
        ComptableFinancierRepository comptableFinancierRepository
    ) {
        this.comptableFinancierService = comptableFinancierService;
        this.comptableFinancierRepository = comptableFinancierRepository;
    }

    /**
     * {@code POST  /comptable-financiers} : Create a new comptableFinancier.
     *
     * @param comptableFinancier the comptableFinancier to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new comptableFinancier, or with status {@code 400 (Bad Request)} if the comptableFinancier has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/comptable-financiers")
    public ResponseEntity<ComptableFinancier> createComptableFinancier(@Valid @RequestBody ComptableFinancier comptableFinancier)
        throws URISyntaxException {
        log.debug("REST request to save ComptableFinancier : {}", comptableFinancier);
        if (comptableFinancier.getId() != null) {
            throw new BadRequestAlertException("A new comptableFinancier cannot already have an ID", ENTITY_NAME, "idexists");
        }
        ComptableFinancier result = comptableFinancierService.save(comptableFinancier);
        return ResponseEntity
            .created(new URI("/api/comptable-financiers/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, false, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /comptable-financiers/:id} : Updates an existing comptableFinancier.
     *
     * @param id the id of the comptableFinancier to save.
     * @param comptableFinancier the comptableFinancier to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated comptableFinancier,
     * or with status {@code 400 (Bad Request)} if the comptableFinancier is not valid,
     * or with status {@code 500 (Internal Server Error)} if the comptableFinancier couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/comptable-financiers/{id}")
    public ResponseEntity<ComptableFinancier> updateComptableFinancier(
        @PathVariable(value = "id", required = false) final Long id,
        @Valid @RequestBody ComptableFinancier comptableFinancier
    ) throws URISyntaxException {
        log.debug("REST request to update ComptableFinancier : {}, {}", id, comptableFinancier);
        if (comptableFinancier.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(id, comptableFinancier.getId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        if (!comptableFinancierRepository.existsById(id)) {
            throw new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound");
        }

        ComptableFinancier result = comptableFinancierService.save(comptableFinancier);
        return ResponseEntity
            .ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, false, ENTITY_NAME, comptableFinancier.getId().toString()))
            .body(result);
    }

    /**
     * {@code PATCH  /comptable-financiers/:id} : Partial updates given fields of an existing comptableFinancier, field will ignore if it is null
     *
     * @param id the id of the comptableFinancier to save.
     * @param comptableFinancier the comptableFinancier to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated comptableFinancier,
     * or with status {@code 400 (Bad Request)} if the comptableFinancier is not valid,
     * or with status {@code 404 (Not Found)} if the comptableFinancier is not found,
     * or with status {@code 500 (Internal Server Error)} if the comptableFinancier couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PatchMapping(value = "/comptable-financiers/{id}", consumes = "application/merge-patch+json")
    public ResponseEntity<ComptableFinancier> partialUpdateComptableFinancier(
        @PathVariable(value = "id", required = false) final Long id,
        @NotNull @RequestBody ComptableFinancier comptableFinancier
    ) throws URISyntaxException {
        log.debug("REST request to partial update ComptableFinancier partially : {}, {}", id, comptableFinancier);
        if (comptableFinancier.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(id, comptableFinancier.getId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        if (!comptableFinancierRepository.existsById(id)) {
            throw new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound");
        }

        Optional<ComptableFinancier> result = comptableFinancierService.partialUpdate(comptableFinancier);

        return ResponseUtil.wrapOrNotFound(
            result,
            HeaderUtil.createEntityUpdateAlert(applicationName, false, ENTITY_NAME, comptableFinancier.getId().toString())
        );
    }

    /**
     * {@code GET  /comptable-financiers} : get all the comptableFinanciers.
     *
     * @param pageable the pagination information.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of comptableFinanciers in body.
     */
    @GetMapping("/comptable-financiers")
    public ResponseEntity<List<ComptableFinancier>> getAllComptableFinanciers(Pageable pageable) {
        log.debug("REST request to get a page of ComptableFinanciers");
        Page<ComptableFinancier> page = comptableFinancierService.findAll(pageable);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(ServletUriComponentsBuilder.fromCurrentRequest(), page);
        return ResponseEntity.ok().headers(headers).body(page.getContent());
    }

    /**
     * {@code GET  /comptable-financiers/:id} : get the "id" comptableFinancier.
     *
     * @param id the id of the comptableFinancier to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the comptableFinancier, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/comptable-financiers/{id}")
    public ResponseEntity<ComptableFinancier> getComptableFinancier(@PathVariable Long id) {
        log.debug("REST request to get ComptableFinancier : {}", id);
        Optional<ComptableFinancier> comptableFinancier = comptableFinancierService.findOne(id);
        return ResponseUtil.wrapOrNotFound(comptableFinancier);
    }

    /**
     * {@code DELETE  /comptable-financiers/:id} : delete the "id" comptableFinancier.
     *
     * @param id the id of the comptableFinancier to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/comptable-financiers/{id}")
    public ResponseEntity<Void> deleteComptableFinancier(@PathVariable Long id) {
        log.debug("REST request to delete ComptableFinancier : {}", id);
        comptableFinancierService.delete(id);
        return ResponseEntity
            .noContent()
            .headers(HeaderUtil.createEntityDeletionAlert(applicationName, false, ENTITY_NAME, id.toString()))
            .build();
    }
}
