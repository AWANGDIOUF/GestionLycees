package mefpai.gouv.sn.web.rest;

import java.net.URI;
import java.net.URISyntaxException;
import java.util.List;
import java.util.Objects;
import java.util.Optional;
import mefpai.gouv.sn.domain.Formation;
import mefpai.gouv.sn.repository.FormationRepository;
import mefpai.gouv.sn.security.SecurityUtils;
import mefpai.gouv.sn.service.FormationService;
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
 * REST controller for managing {@link mefpai.gouv.sn.domain.Formation}.
 */
@RestController
@RequestMapping("/api")
public class FormationResource {

    private final Logger log = LoggerFactory.getLogger(FormationResource.class);

    private static final String ENTITY_NAME = "formation";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final FormationService formationService;

    private final FormationRepository formationRepository;

    public FormationResource(FormationService formationService, FormationRepository formationRepository) {
        this.formationService = formationService;
        this.formationRepository = formationRepository;
    }

    /**
     * {@code POST  /formations} : Create a new formation.
     *
     * @param formation the formation to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new formation, or with status {@code 400 (Bad Request)} if the formation has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/formations")
    public ResponseEntity<Formation> createFormation(@RequestBody Formation formation) throws URISyntaxException {
        log.debug("REST request to save Formation : {}", formation);
        if (formation.getId() != null) {
            throw new BadRequestAlertException("A new formation cannot already have an ID", ENTITY_NAME, "idexists");
        }
        Formation result = formationService.save(formation);
        return ResponseEntity
            .created(new URI("/api/formations/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, false, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /formations/:id} : Updates an existing formation.
     *
     * @param id the id of the formation to save.
     * @param formation the formation to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated formation,
     * or with status {@code 400 (Bad Request)} if the formation is not valid,
     * or with status {@code 500 (Internal Server Error)} if the formation couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/formations/{id}")
    public ResponseEntity<Formation> updateFormation(
        @PathVariable(value = "id", required = false) final Long id,
        @RequestBody Formation formation
    ) throws URISyntaxException {
        log.debug("REST request to update Formation : {}, {}", id, formation);
        if (formation.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(id, formation.getId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        if (!formationRepository.existsById(id)) {
            throw new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound");
        }

        Formation result = formationService.save(formation);
        return ResponseEntity
            .ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, false, ENTITY_NAME, formation.getId().toString()))
            .body(result);
    }

    /**
     * {@code PATCH  /formations/:id} : Partial updates given fields of an existing formation, field will ignore if it is null
     *
     * @param id the id of the formation to save.
     * @param formation the formation to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated formation,
     * or with status {@code 400 (Bad Request)} if the formation is not valid,
     * or with status {@code 404 (Not Found)} if the formation is not found,
     * or with status {@code 500 (Internal Server Error)} if the formation couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PatchMapping(value = "/formations/{id}", consumes = "application/merge-patch+json")
    public ResponseEntity<Formation> partialUpdateFormation(
        @PathVariable(value = "id", required = false) final Long id,
        @RequestBody Formation formation
    ) throws URISyntaxException {
        log.debug("REST request to partial update Formation partially : {}, {}", id, formation);
        if (formation.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(id, formation.getId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        if (!formationRepository.existsById(id)) {
            throw new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound");
        }

        Optional<Formation> result = formationService.partialUpdate(formation);

        return ResponseUtil.wrapOrNotFound(
            result,
            HeaderUtil.createEntityUpdateAlert(applicationName, false, ENTITY_NAME, formation.getId().toString())
        );
    }

    /**
     * {@code GET  /formations} : get all the formations.
     *
     * @param pageable the pagination information.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of formations in body.
     */
    @GetMapping("/formations")
    public ResponseEntity<List<Formation>> getAllFormations(Pageable pageable) {
        log.debug("REST request to get a page of Formations");
        if (SecurityUtils.hasCurrentUserThisAuthority("ROLE_ADMIN")) {
            Page<Formation> page = formationService.findAll(pageable);
            HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(ServletUriComponentsBuilder.fromCurrentRequest(), page);
            return ResponseEntity.ok().headers(headers).body(page.getContent());
        }
        return ResponseEntity
            .ok()
            .headers(
                PaginationUtil.generatePaginationHttpHeaders(
                    ServletUriComponentsBuilder.fromCurrentRequest(),
                    (formationService.findByUserIsCurrentUser(pageable))
                )
            )
            .body((formationRepository.findByUserIsCurrentUser(pageable)).getContent());
    }

    /**
     * {@code GET  /formations/:id} : get the "id" formation.
     *
     * @param id the id of the formation to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the formation, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/formations/{id}")
    public ResponseEntity<Formation> getFormation(@PathVariable Long id) {
        log.debug("REST request to get Formation : {}", id);
        Optional<Formation> formation = formationService.findOne(id);
        return ResponseUtil.wrapOrNotFound(formation);
    }

    /**
     * {@code DELETE  /formations/:id} : delete the "id" formation.
     *
     * @param id the id of the formation to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/formations/{id}")
    public ResponseEntity<Void> deleteFormation(@PathVariable Long id) {
        log.debug("REST request to delete Formation : {}", id);
        formationService.delete(id);
        return ResponseEntity
            .noContent()
            .headers(HeaderUtil.createEntityDeletionAlert(applicationName, false, ENTITY_NAME, id.toString()))
            .build();
    }
}
