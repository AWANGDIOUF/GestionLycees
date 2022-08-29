package mefpai.gouv.sn.web.rest;

import java.net.URI;
import java.net.URISyntaxException;
import java.util.List;
import java.util.Objects;
import java.util.Optional;
import mefpai.gouv.sn.domain.Localisation;
import mefpai.gouv.sn.repository.LocalisationRepository;
import mefpai.gouv.sn.service.LocalisationService;
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
 * REST controller for managing {@link mefpai.gouv.sn.domain.Localisation}.
 */
@RestController
@RequestMapping("/api")
public class LocalisationResource {

    private final Logger log = LoggerFactory.getLogger(LocalisationResource.class);

    private static final String ENTITY_NAME = "localisation";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final LocalisationService localisationService;

    private final LocalisationRepository localisationRepository;

    public LocalisationResource(LocalisationService localisationService, LocalisationRepository localisationRepository) {
        this.localisationService = localisationService;
        this.localisationRepository = localisationRepository;
    }

    /**
     * {@code POST  /localisations} : Create a new localisation.
     *
     * @param localisation the localisation to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new localisation, or with status {@code 400 (Bad Request)} if the localisation has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/localisations")
    public ResponseEntity<Localisation> createLocalisation(@RequestBody Localisation localisation) throws URISyntaxException {
        log.debug("REST request to save Localisation : {}", localisation);
        if (localisation.getId() != null) {
            throw new BadRequestAlertException("A new localisation cannot already have an ID", ENTITY_NAME, "idexists");
        }
        Localisation result = localisationService.save(localisation);
        return ResponseEntity
            .created(new URI("/api/localisations/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, false, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /localisations/:id} : Updates an existing localisation.
     *
     * @param id the id of the localisation to save.
     * @param localisation the localisation to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated localisation,
     * or with status {@code 400 (Bad Request)} if the localisation is not valid,
     * or with status {@code 500 (Internal Server Error)} if the localisation couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/localisations/{id}")
    public ResponseEntity<Localisation> updateLocalisation(
        @PathVariable(value = "id", required = false) final Long id,
        @RequestBody Localisation localisation
    ) throws URISyntaxException {
        log.debug("REST request to update Localisation : {}, {}", id, localisation);
        if (localisation.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(id, localisation.getId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        if (!localisationRepository.existsById(id)) {
            throw new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound");
        }

        Localisation result = localisationService.save(localisation);
        return ResponseEntity
            .ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, false, ENTITY_NAME, localisation.getId().toString()))
            .body(result);
    }

    /**
     * {@code PATCH  /localisations/:id} : Partial updates given fields of an existing localisation, field will ignore if it is null
     *
     * @param id the id of the localisation to save.
     * @param localisation the localisation to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated localisation,
     * or with status {@code 400 (Bad Request)} if the localisation is not valid,
     * or with status {@code 404 (Not Found)} if the localisation is not found,
     * or with status {@code 500 (Internal Server Error)} if the localisation couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PatchMapping(value = "/localisations/{id}", consumes = "application/merge-patch+json")
    public ResponseEntity<Localisation> partialUpdateLocalisation(
        @PathVariable(value = "id", required = false) final Long id,
        @RequestBody Localisation localisation
    ) throws URISyntaxException {
        log.debug("REST request to partial update Localisation partially : {}, {}", id, localisation);
        if (localisation.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(id, localisation.getId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        if (!localisationRepository.existsById(id)) {
            throw new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound");
        }

        Optional<Localisation> result = localisationService.partialUpdate(localisation);

        return ResponseUtil.wrapOrNotFound(
            result,
            HeaderUtil.createEntityUpdateAlert(applicationName, false, ENTITY_NAME, localisation.getId().toString())
        );
    }

    /**
     * {@code GET  /localisations} : get all the localisations.
     *
     * @param pageable the pagination information.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of localisations in body.
     */
    @GetMapping("/localisations")
    public ResponseEntity<List<Localisation>> getAllLocalisations(Pageable pageable) {
        log.debug("REST request to get a page of Localisations");
        Page<Localisation> page = localisationService.findAll(pageable);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(ServletUriComponentsBuilder.fromCurrentRequest(), page);
        return ResponseEntity.ok().headers(headers).body(page.getContent());
    }

    /**
     * {@code GET  /localisations/:id} : get the "id" localisation.
     *
     * @param id the id of the localisation to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the localisation, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/localisations/{id}")
    public ResponseEntity<Localisation> getLocalisation(@PathVariable Long id) {
        log.debug("REST request to get Localisation : {}", id);
        Optional<Localisation> localisation = localisationService.findOne(id);
        return ResponseUtil.wrapOrNotFound(localisation);
    }

    /**
     * {@code DELETE  /localisations/:id} : delete the "id" localisation.
     *
     * @param id the id of the localisation to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/localisations/{id}")
    public ResponseEntity<Void> deleteLocalisation(@PathVariable Long id) {
        log.debug("REST request to delete Localisation : {}", id);
        localisationService.delete(id);
        return ResponseEntity
            .noContent()
            .headers(HeaderUtil.createEntityDeletionAlert(applicationName, false, ENTITY_NAME, id.toString()))
            .build();
    }
}
